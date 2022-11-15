import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { Transition } from "react-transition-group";

const FadeInAnimation = ({ children }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(!show);
  }, []);

  return (
    <Transition
      timeout={1000}
      in={show}
      onEnter={(e) => {
        gsap.fromTo(
          e,
          {
            autoAlpha: 0,
            y: 100,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "Sine.easeInOut",
          }
        );
      }}
    >
      {children}
    </Transition>
  );
};

export default FadeInAnimation;
