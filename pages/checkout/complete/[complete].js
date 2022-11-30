import React from "react";
import { useRouter } from "next/router";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { decryptText } from "../../../utils/utils";
import { checkoutGet } from "../../../lib/serverRequest";
import CartSummary from "../../../components/Stripe/CartSummary";

import { NextSeo } from "next-seo";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { BsCheckCircle } from "react-icons/bs";
import Button from "@mui/material/Button";

export default function Complete({ id }) {
  const router = useRouter();

  let { data } = useQuery(
    ["checkout", id],
    () =>
      checkoutGet({
        id: id,
      }),
    { staleTime: 1000 * 60 * 60 * 24 }
  );

  return (
    <>
      <NextSeo
        title={`Thank you ${data.data.node.shippingAddress.name}! - Ecommerce Template - Checkout`}
        description=""
      />

      <div className="relative md:w-screen md:h-screen grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-1 md:col-span-2 h-full w-full flex justify-center py-5 md:py-20">
          <div className="flex flex-col space-y-5 md:w-1/2 mx-5 md:mx-0">
            <p className="text-2xl">Ecommerce Template</p>
            <p className="text-lg flex flex-row items-center">
              Thank you{" "}
              <span className="font-bold ml-1">
                {data.data.node.shippingAddress.name}!
              </span>
              <span className="ml-5">
                <BsCheckCircle className="text-green-500 text-3xl" />
              </span>
            </p>
            <div>
              <div className="border-t-2 border-l-2 border-r-2 bg-white w-full rounded-tl-md rounded-tr-md py-3 px-3">
                <p className="text-lg mb-2">Your order is confirmed!</p>
                <p className="font-thin">
                  You’ll receive a confirmation email with your order number
                  shortly.
                </p>
              </div>
              <div className="bg-slate-200 border-2 px-3 py-1 rounded-bl-md rounded-br-md">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <p className="text-sm">Subscribe for our latest offer</p>
                    }
                  />
                </FormGroup>
              </div>
            </div>
            <div>
              <div className="border-2 bg-white w-full rounded-tl-md rounded-md py-3 px-3">
                <p className="text-lg mb-2">Order updates</p>
                <p className="font-thin">
                  You’ll get shipping and delivery updates by email.
                </p>
              </div>
            </div>

            <div>
              <div className="border-2 bg-white w-full rounded-tl-md rounded-md py-3 px-3">
                <p className="text-lg mb-5">Customer Information</p>
                <div className="grid grid-cols-1 gap-5 md:gap-0 md:grid-cols-2">
                  <div className="flex flex-col space-y-2 md:space-y-5">
                    <div className="flex flex-col md:space-y-3">
                      <p className="font-bold text-sm">Contact information</p>
                      <p className="text-sm text-gray-500">
                        {data.data.node.email}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-3">
                      <p className="font-bold text-sm">Shipping address</p>
                      <div>
                        <p className="text-sm text-gray-500">
                          {data.data.node.shippingAddress.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {data.data.node.shippingAddress.address1}
                        </p>
                        <p className="text-sm text-gray-500">
                          {data.data.node.shippingAddress.address2}
                        </p>
                        <p className="text-sm text-gray-500">
                          {data.data.node.shippingAddress.city}
                        </p>
                        <p className="text-sm text-gray-500">
                          {data.data.node.shippingAddress.province}
                        </p>
                        <p className="text-sm text-gray-500">
                          {data.data.node.shippingAddress.zip}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col md:space-y-3">
                      <p className="font-bold text-sm">Shipping method</p>
                      <p className="text-sm text-gray-500">
                        {data.data.node.shippingLine.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 md:space-y-5">
                    <div className="flex flex-col md:space-y-2">
                      <p className="font-bold text-sm">Payment method</p>
                      <p>dnam310199@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <Button
                size="small"
                className="text-black normal-case border-black rounded-lg"
                variant="outlined"
                onClick={() => router.push("/shop")}
              >
                Back to shop
              </Button>
              <p className="text-right text-sm">
                Need help?{" "}
                <span
                  className="font-bold cursor-pointer hover:underline"
                  onClick={() => router.push("/contact")}
                >
                  Contact Us
                </span>
              </p>
            </div>
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
        </div>{" "}
      </div>
    </>
  );
}

const queryClient = new QueryClient();
export async function getServerSideProps({ query }) {
  let { complete } = query;
  complete = decodeURIComponent(decryptText(complete));
  await queryClient.prefetchQuery(
    ["checkout", complete],
    () =>
      checkoutGet({
        id: complete,
      }),
    {
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id: complete,
    },
  };
}
