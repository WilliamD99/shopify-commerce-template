import React, { useState, useEffect, useContext, useRef } from "react";
import deviceContext from "../utils/deviceContext";
import { Transition } from "react-transition-group";
import { gsap, encryptText, checkoutPathGenerator } from "../utils/utils";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import useCheckoutCreate from "../utils/hooks/useCheckoutCreate";
import { Flip } from "gsap/dist/Flip";
import TextField from "@mui/material/TextField";
import SingleProduct from "../components/Shop/single-product";
import Accordion from "../components/ProductDetails/accordion";
import { useRouter } from "next/router";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { productByHandle } from "../lib/serverRequest";
import Banner from "../components/Home/Banner";
import AnimateOnMount from "../components/Animation/AnimateOnMount";
import AnimateOnScroll from "../components/Animation/AnimateOnScroll";
import Gallery from "../components/Animation/Gallery";
import Image from "../components/common/Image";
import FluidBackground from "../components/Animation/FluidBackground";
import Button from "@mui/material/Button";
import TextReveal from "../components/Animation/TextReveal";
import { FiSearch } from "react-icons/fi";
import Search from '../components/common/Search'
import StripeElement from "../lib/stripe";
import axios from "axios";

export default function Test() {
  const [show, setShow] = useState(false);
  const { isMobile } = useContext(deviceContext);
  const [open, setOpen] = useState(false);

  const ele = useRef();

  // useEffect(() => {
  //   axios.post("/api/stripe/payment-intent-create", {
  //     data: {
  //       amount: 500,
  //       currency: "cad",
  //       payment_method_types: "card"
  //     }
  //   }).then(res => console.log(res))
  // }, [])


  // useEffect(() => {
  //   axios.post("/api/stripe/payment-intent-retrieve", {
  //     data: {
  //       id: "pi_3M7RuCJF5iU7SUPZ1MU7y1ds_secret_uc9W1MJerQkXA63qMQvu8SrKH"
  //     }
  //   }).then(res => console.log(res))
  // }, [])

  return (
    <>
      <StripeElement />
    </>
  );
}
// "pi_3M7RuCJF5iU7SUPZ1MU7y1ds_secret_uc9W1MJerQkXA63qMQvu8SrKH"
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
