import React, { useState, useEffect, useContext, useRef } from "react";
import deviceContext from "../utils/deviceContext";
import { Transition } from "react-transition-group";
import { gsap, encryptText, checkoutPathGenerator } from "../utils/utils";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import useCheckoutCreate from "../utils/hooks/useCheckoutCreate";
import { Flip } from "gsap/dist/Flip";
import TextField from "@mui/material/TextField";
import SingleProduct from "../components/Shop/single-product";
import Accordion from "../components/ProductDetails/accordion";
import { useRouter } from "next/router";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { productByHandle } from "../lib/serverRequest";
import Banner from '../components/Home/Banner'
import AnimateOnMount from "../components/Animation/AnimateOnMount";
import AnimateOnScroll from "../components/Animation/AnimateOnScroll";
import Gallery from '../components/Animation/Gallery'

export default function Test() {
  const [show, setShow] = useState(false);
  const { isMobile } = useContext(deviceContext)

  const ele = useRef()
  // const { data } = useQuery(
  //   ["product", "allo-ultra-2500-disposable"],
  //   () => productByHandle("allo-ultra-2500-disposable"),
  //   {
  //     staleTime: 1000 * 60 * 60 * 24,
  //   }
  // );
  // console.log(data);

  // useEffect(() => {
  //   // setShow(!show);
  //   gsap.set(ele.current, { autoAlpha: 0, y: 200 })
  //   ScrollTrigger.batch(ele.current, {
  //     interval: 0.25,
  //     onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, ease: "Sine.easeInOut" })
  //   })
  // }, []);


  return (
    <>
      <p onClick={() => setShow(!show)}>Test</p>
      {/* <div style={{ height: "100vh" }}></div> */}

      <Gallery data={['test1', 'test2']} />
    </>
  );
}

// const queryClient = new QueryClient();
// export async function getServerSideProps({ query, res }) {
//   //   let { index } = query;
//   await queryClient.prefetchQuery(
//     ["product", "allo-ultra-2500-disposable"],
//     () => productByHandle("allo-ultra-2500-disposable"),
//     {
//       staleTime: 1000 * 60 * 60 * 24,
//     }
//   );

//   res.setHeader(
//     "Cache-Control",
//     "public, s-maxage=30, stale-while-revalidate=59"
//   );

//   console.log(query);
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }
