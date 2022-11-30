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
import Search from "../components/common/Search";
import axios from "axios";

import Head from "next/head";
import Script from "next/script";

export default function Test() {
  const [show, setShow] = useState(false);
  const { isMobile } = useContext(deviceContext);
  const [open, setOpen] = useState(false);

  const ele = useRef();

  return (
    <>
      <Head>
        <Script
          src="/script/fluid.js"
          id="test"
          onLoad={() => console.log("test")}
        />
      </Head>
    </>
  );
}
