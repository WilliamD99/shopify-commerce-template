import React, { useEffect, useRef } from "react";
import useCustomerGet from "../utils/hooks/useCustomerGet";
import { decryptText, gsap } from "../utils/utils";
import { Flip } from "gsap/dist/Flip";

import Login from "../components/User/login";

export default function Test() {
  return (
    <>
      <button
        onClick={() => {
          const box = document.querySelector(".box");
          const state = Flip.getState(".box, .test");

          box.classList.toggle("grid-cols-4");
          box.classList.toggle("grid-cols-3");

          Flip.from(state, {
            absolute: true, // uses position: absolute during the flip to work around flexbox challenges
            duration: 0.5,
            stagger: 0.1,
            ease: "power1.inOut",
            // you can use any other tweening properties here too, like onComplete, onUpdate, delay, etc.
          });
        }}
      >
        Click
      </button>
      <div className="grid grid-cols-4 box">
        <p className="test">Test</p>
        <p className="test">Test</p>
        <p className="test">Test</p>
        <p className="test">Test</p>
        <p className="test">Test</p>
        <p className="test">Test</p>
      </div>
      <Login />
    </>
  );
}
