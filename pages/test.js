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

export default function Test() {
  const [show, setShow] = useState(false);
  const { isMobile } = useContext(deviceContext);
  const [open, setOpen] = useState(false);

  const ele = useRef();
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

  useEffect(() => {
    setOpen(!open);
  }, []);

  return (
    <>
      {/* <p onClick={() => setOpen(!open)}>Test</p> */}
      {/* <div style={{ height: "100vh" }}></div> */}

      <div className="relative h-128 lg:h-screen w-screen flex flex-col justify-center items-center">
        <div className="absolute top-0 left-0 h-full w-full">
          <FluidBackground />
        </div>
        <Transition
          timeout={1000}
          mountOnEnter
          unmountOnExit
          in={open}
          addEndListener={(node, done) => {
            gsap.fromTo(
              ".banner-content",
              {
                y: open ? 100 : 0,
                autoAlpha: open ? 0 : 1,
              },
              {
                y: open ? 0 : 100,
                autoAlpha: open ? 1 : 0,
                onComplete: done,
                delay: 0.5,
                stagger: 0.1,
              }
            );
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-5 lg:space-y-10 w-11/12 lg:w-1/2">
            <p className="text-white text-xl lg:text-3xl text-center font-semibold banner-content">
              Welcome to Ecommerce Template
            </p>
            <p className="text-white text-center banner-content">
              We offer quality e-cigarettes, e-juice, disposables, nicotine
              salts and much more for both pickup and shipping. Your order is
              FREE if over <span className="font-bold">$100</span> (+tax). If
              your order is below $100 your shipping fee is $15 flat if within
              British Columbia.
            </p>
            <Button
              variant="outlined"
              className="text-white normal-case bg-black border-white hover:text-black hover:bg-white w-36 lg:w-44 rounded-full banner-content"
            >
              See More
            </Button>
          </div>
        </Transition>
        {/* <Transition
          timeout={1000}
          mountOnEnter
          unmountOnExit
          in={open}
          addEndListener={(node, done) => {
            gsap.fromTo(
              node,
              {
                x: open ? -100 : 0,
                autoAlpha: open ? 0 : 1,
              },
              {
                x: open ? 0 : -100,
                autoAlpha: open ? 1 : 0,
                onComplete: done,
                delay: 0.5,
              }
            );
          }}
        >
          <div className="grid grid-cols-3 grid-rows-2 w-full h-full gap-10">
            <div className="h-full relative w-full">
              <Image
                src="https://cdn.shopify.com/s/files/1/0548/9652/5492/files/ac.jpg?v=1643832427"
                layout="fill"
              />
            </div>
            <div className="h-full relative w-full">
              <Image
                src="https://cdn.shopify.com/s/files/1/0548/9652/5492/files/ac.jpg?v=1643832427"
                layout="fill"
              />
            </div>
            <div className="h-full relative w-full">
              <Image
                src="https://cdn.shopify.com/s/files/1/0548/9652/5492/files/ac.jpg?v=1643832427"
                layout="fill"
              />
            </div>
          </div>
        </Transition> */}
      </div>
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
