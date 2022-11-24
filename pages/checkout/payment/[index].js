import React, { useState, useEffect } from "react";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { decryptText, setCookie, getCookie } from "../../../utils/utils";
import { checkoutGet } from "../../../lib/serverRequest";
import CheckoutForm from "../../../components/Stripe/CheckoutForm";
import Loading from "../../../components/Loading/dataLoading";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

// This page need checkoutId
export default function Index({ id }) {
  let [isCreateIntent, setCreateIntent] = useState(false);
  let [stripeOption, setStripeOption] = useState({
    clientSecret:
      "pi_3M7UMTDLvTNEyZ890lBMF7xl_secret_OZvOGEZmIA4UXjrFXK7rJM3Fl",
  }); //pi_3M7UMTDLvTNEyZ890lBMF7xl_secret_OZvOGEZmIA4UXjrFXK7rJM3Fl

  let { data } = useQuery(
    ["checkout", id],
    () =>
      checkoutGet({
        id: id,
      }),
    { staleTime: 1000 * 60 * 60 * 24 }
  );
  console.log(data);

  let createPaymentIntent = async (total, currency, method) => {
    let data = await axios.post("/api/stripe/payment-intent-create", {
      data: {
        amount: total * 100,
        currency: currency,
        payment_method_types: method,
      },
    });
    setCookie("pi", JSON.stringify(data));
    setStripeOption({ clientSecret: data.data });
    setCreateIntent(true);
    return data;
  };

  useEffect(() => {
    let pi = getCookie("pi");
    if (!pi) {
      let dataNode = data.data.node;
      let total = parseFloat(dataNode.totalPriceV2.amount);
      let currency = "cad"; // Default
      let method = "card"; // Default

      //   let paymentIntent = createPaymentIntent(total, currency, method);
      // console.log(paymentIntent)
    } else {
      setCreateIntent(true);
    }
  }, []);

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
      <Elements stripe={stripePromise} options={stripeOption}>
        <CheckoutForm />
      </Elements>
    </>
  );
}

const queryClient = new QueryClient();
export async function getServerSideProps({ query }) {
  let { index } = query;
  index = decodeURIComponent(decryptText(index));
  console.log(index);
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
// U2FsdGVkX18hUWkOiDfkRKIT7nmAs4u6BbQAi/NVubU6UagHvC4IJlObnKBL8xN7qSN3/ej5OKBGHdJ1/uP5C2aQZe3St/369zdHNoEMTRU9VRvu6c/D1s8kdCZNQ5yffwpMoC3E1dqHsRfQ3Wwf2w==
