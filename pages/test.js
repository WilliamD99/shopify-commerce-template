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

  let detailsRef = useRef()
  let [activeItem, setActiveItem] = useState()
  let showGallery = (item) => {
    let details = detailsRef.current
    Flip.fit(details, item, { scale: true })
    const state = Flip.getState(details)
    gsap.set(details, { clearProps: true })
    gsap.set(details, { xPercent: -50, yPercent: -50, top: "50%", left: "50%", visibility: "visible", overflow: "hidden" });

    Flip.from(state, {
      duration: 0.5,
      ease: "power2.inOut",
      scale: true,
      onStart: () => detailsRef.current.classList.remove("invisible"),
      onComplete: () => gsap.set(details, { overflow: "auto" }) // to permit scrolling if necessary
    })
    setActiveItem(item)
    setShow(!show)
  }

  let hideGallery = () => {
    let details = detailsRef.current

    gsap.set(details, { overflow: "hidden" })
    const state = Flip.getState(details)

    Flip.fit(details, activeItem, { scale: true })

    Flip.from(state, {
      scale: true,
      duration: 0.5,
      // delay: 0.2, // 0.2 seconds because we want the details to slide up first, then flip.
      onComplete: () => detailsRef.current.classList.add("invisible"),
    })
      .set(details, { visibility: "hidden" });
    setShow(false)
  }

  return (
    <>
      <p onClick={() => setShow(!show)}>Test</p>
      {/* <div style={{ height: "100vh" }}></div> */}
      <div className="grid grid-cols-3 gap-10 relative">
        <div className="border-2 h-44 item" onClick={(e) => {
          if (!show) {
            showGallery(e.target)
          } else {
            hideGallery()
          }
        }}>
          <p>Test</p>
        </div>
        <div ref={detailsRef} className="fixed bg-black w-screen h-screen invisible border-none">
          <p className="text-white" onClick={hideGallery}>Test</p>
        </div>
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
