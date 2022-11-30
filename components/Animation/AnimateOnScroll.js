import React, { useRef, useEffect, useCallback } from "react";
import { gsap } from "../../utils/utils";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Up: 200 -> 0 (Y)
// Down: -200 -> 0 (Y)
// Left: 200 -> 0 (X)
// Right: -200 -> 0 (X)

// Specifie selector if there are more than 2 elements
export default function AnimateOnScroll({
  children,
  selector,
  direction,
  stagger,
}) {
  const ele = useRef();
  let animStagger = stagger ? stagger : 0.2;
  let animDirectionFunc = useCallback(() => {
    let animDirection;
    switch (direction) {
      case "left":
        animDirection = "x";
        break;
      case "right":
        animDirection = "x";
        break;
      case "up":
        animDirection = "y";
        break;
      case "down":
        animDirection = "y";
        break;
      default:
        animDirection = "y";
    }
    return animDirection;
  }, [direction]);

  useEffect(() => {
    let startLocation = {};
    if (direction === "down" || direction === "right") {
      startLocation[animDirectionFunc()] = -200;
    } else {
      startLocation[animDirectionFunc()] = 200;
    }

    if (selector) {
      gsap.set(selector, { autoAlpha: 0, ...startLocation });
      ScrollTrigger.batch(selector, {
        interval: 0.1,
        onEnter: (batch) => {
          startLocation[animDirectionFunc()] = 0;
          let eleClass = ele.current?.classList;
          if (eleClass) eleClass.remove("invisible");
          gsap.to(batch, {
            autoAlpha: 1,
            ...startLocation,
            ease: "Sine.easeInOut",
            stagger: animStagger,
          });
        },
      });
    } else {
      gsap.set(ele.current, { autoAlpha: 0, ...startLocation });
      ScrollTrigger.batch(ele.current, {
        interval: 0.1,
        onEnter: (batch) => {
          let eleClass = ele.current?.classList;
          if (eleClass) eleClass.remove("invisible");
          gsap.to(batch, { autoAlpha: 1, x: 0, ease: "Sine.easeInOut" });
        },
      });
    }
  }, []);
  return (
    <>
      <div className="invisible" ref={ele}>
        {children}
      </div>
    </>
  );
}
