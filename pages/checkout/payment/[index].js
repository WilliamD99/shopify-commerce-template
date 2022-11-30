import React, { useState, useEffect, useContext } from "react";
import userContext from "../../../utils/userContext";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";

import { decryptText, setCookie, getCookie } from "../../../utils/utils";
import { checkoutGet } from "../../../lib/serverRequest";
import CheckoutForm from "../../../components/Stripe/CheckoutForm";
import Loading from "../../../components/Loading/dataLoading";
import ContactSummary from "../../../components/Stripe/ContactSummary";
import CartSummary from "../../../components/Stripe/CartSummary";
import { toast, ToastContainer } from "react-toastify";
import { Zoom } from "react-toastify";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

// This page need checkoutId
export default function Index({ id }) {
  let [isCreateIntent, setCreateIntent] = useState(false);
  let { user } = useContext(userContext);
  const [isProcess, setIsProcess] = useState(false);
  const router = useRouter();

  let { data } = useQuery(
    ["checkout", id],
    () =>
      checkoutGet({
        id: id,
      }),
    { staleTime: 1000 * 60 * 60 * 24 }
  );

  let createPaymentIntent = async (total, currency, checkout) => {
    // Items in cart
    let items = [];
    checkout.lineItems.edges.map((e) => {
      items.push({ variantId: e.node.variant.id, quantity: e.node.quantity });
    });

    // Select shipping option
    let shippingLine = {
      title: checkout.shippingLine.title,
      price: parseFloat(checkout.shippingLine.priceV2.amount),
    };

    // Shipping Address
    let shippingAddress = checkout.shippingAddress;
    delete shippingAddress.name;

    let data = await axios.post("/api/stripe/payment-intent-create", {
      data: {
        amount: total * 100,
        currency: currency,
        customerId: user.id,
        lineItems: items,
        shippingLine: shippingLine,
        shippingAddress: shippingAddress,
      },
    });
    setCookie("pi", data.data);
    setCreateIntent(true);
    return data;
  };

  useEffect(() => {
    setCookie("pi", null);
    if (!sessionStorage.getItem("checkoutId")) {
      router.push(`/cart`);
      toast.warning("Oops, something happend unexpectedly");
    } else {
      let pi = getCookie("pi");
      if (!pi) {
        let dataNode = data.data.node;
        if (dataNode) {
          let total = parseFloat(dataNode.totalPriceV2.amount);
          let currency = "cad"; // Default

          if (!user.state) {
            createPaymentIntent(total, currency, data.data.node);
          }
        }
      } else {
        setCreateIntent(true);
      }
    }
  }, [user]);
  useEffect(() => {
    if (data?.errors || !data?.data.node) {
      toast.error("Invalid ID, please wait to be redirected");
      sessionStorage.removeItem("checkoutId");
      setTimeout(() => {
        router.push("/cart");
      }, 1500);
    }
  }, [data]);

  if (data?.errors || !data?.data.node || !getCookie("pi")) {
    return <></>;
  }

  if (!isCreateIntent)
    return (
      <>
        <div className="absolute top-1/3 left-1/2">
          <Loading />
        </div>
      </>
    );

  return (
    <>
      {isProcess ? (
        <div className="absolute w-screen h-screen z-50  backdrop-blur-sm">
          <Loading>
            <p className="text-black ">
              Hold on while we're processing your request
            </p>
          </Loading>
        </div>
      ) : (
        <></>
      )}
      <div className="relative md:w-screen md:h-screen grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2 h-full w-full flex justify-center py-5 md:py-20">
          <div className="flex flex-col px-5 md:px-0 md:w-1/3 space-y-8 md">
            <p className="text-2xl font-semibold">Payment Gateway</p>
            <ContactSummary
              email={data.data.node.email}
              address={data.data.node.shippingAddress}
              shipping={data.data.node.shippingLine}
            />
            <div className="flex flex-col space-y-1">
              <p className="text-lg">Payment</p>
              <p className="font-thin">
                All transactions are secure and encrypted with{" "}
                <span className="font-bold">PCI compliance.</span>
              </p>
            </div>
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret: getCookie("pi"),
              }}
            >
              <CheckoutForm
                setIsProcess={setIsProcess}
                checkout={data.data.node}
              />
            </Elements>
          </div>
        </div>
        <div className="bg-slate-100 md:py-20 py-5 md:px-10 ">
          <div className="">
            <CartSummary
              items={data.data.node.lineItems.edges}
              tax={parseFloat(data.data.node.totalTaxV2.amount)}
              total={parseFloat(data.data.node.totalPriceV2.amount)}
              subtotal={parseFloat(
                data.data.node.lineItemsSubtotalPrice.amount
              )}
              shippingCost={parseFloat(
                data.data.node.shippingLine.priceV2.amount
              )}
            />
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick
        theme="light"
        transition={Zoom}
      />
    </>
  );
}

const queryClient = new QueryClient();
export async function getServerSideProps({ query }) {
  let { index } = query;
  index = decodeURIComponent(decryptText(index));
  await queryClient.prefetchQuery(
    ["checkout", index],
    () =>
      checkoutGet({
        id: index,
      }),
    {
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id: index,
    },
  };
}
