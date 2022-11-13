import React, { useEffect, useState } from "react";
import Footer from "./Base/footer";
import Header from "./Base/header";

import { ToastContainer } from "react-toastify";
import { gsap } from "../utils/utils";
import { Zoom } from "react-toastify";

export default function Layout({ children }) {
  const [stickyClass, setStickyClass] = useState("");
  const [marginTop, setMarginTop] = useState(0);

  const handleStickyHeader = () => {
    let header = document.querySelector("#header");
    const scrollTop = window.scrollY;
    if (
      scrollTop > header.getBoundingClientRect().height + 200 &&
      !header.classList.contains("is-sticky")
    ) {
      setStickyClass("is-sticky w-screen shadow-xl");
      setMarginTop(header.getBoundingClientRect().height);
      gsap.fromTo("#header", { top: -20, alpha: 0.5 }, { top: 0, alpha: 1 });
    } else if (
      window.pageYOffset === 0 &&
      header.classList.contains("is-sticky")
    ) {
      setStickyClass("");
      setMarginTop(0);
    }
  };

  // Sticky Menu Area
  useEffect(() => {
    window.addEventListener("scroll", handleStickyHeader);
    return () => {
      window.removeEventListener("scroll", handleStickyHeader);
    };
  }, []);

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header sticky={stickyClass} />
      <div className="min-h-screen" style={{ marginTop: marginTop }}>
        {children}
      </div>
      {/* <Footer /> */}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick
        theme="dark"
        transition={Zoom}
      />
    </div>
  );
}
