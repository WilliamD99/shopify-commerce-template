import React, { useState, useEffect } from "react";
import { Transition } from "react-transition-group";
import { gsap, encryptText, checkoutPathGenerator } from "../utils/utils";
import useCheckoutCreate from "../utils/hooks/useCheckoutCreate";
import { Flip } from "gsap/dist/Flip";
import TextField from "@mui/material/TextField";
import SingleProduct from "../components/Shop/single-product";
import Accordion from "../components/ProductDetails/accordion";
import { useRouter } from "next/router";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { productByHandle } from "../lib/serverRequest";

export default function Test() {
  const [show, setShow] = useState(false);
  const { data } = useQuery(
    ["product", "allo-ultra-2500-disposable"],
    () => productByHandle("allo-ultra-2500-disposable"),
    {
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
  console.log(data);

  useEffect(() => {
    setShow(!show);
  }, []);

  return (
    <>
      <p onClick={() => setShow(!show)}>Test</p>
      <Transition
        timeout={1000}
        mountOnEnter
        unmountOnExit
        in={show}
        addEndListener={(node, done) => {
          gsap.fromTo(
            node,
            {
              x: show ? 0 : 100,
              autoAlpha: show ? 0 : 1,
            },
            {
              x: show ? 100 : 0,
              autoAlpha: show ? 1 : 0,
              onComplete: done,
            }
          );
        }}
      >
        <p>Test</p>
      </Transition>
    </>
  );
}

const queryClient = new QueryClient();
export async function getServerSideProps({ query, res }) {
  //   let { index } = query;
  await queryClient.prefetchQuery(
    ["product", "allo-ultra-2500-disposable"],
    () => productByHandle("allo-ultra-2500-disposable"),
    {
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=59"
  );

  console.log(query);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
