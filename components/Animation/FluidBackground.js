import React, { useEffect, useState } from "react";

export default function FluidBackground() {
  const [style] = useState({
    color: "black",
    height: "100%", // Canvas is will respond to size changes without resetting fluid!
    width: "100%",
    margin: 0,
    backgroundColor: "black",
  });

  useEffect(() => {
    let fluidAnimation = document.getElementById("fluid-animation");
    if (!fluidAnimation) {
      const script = document.createElement("script");
      script.id = "fluid-animation";
      script.src = "./script/fluid.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <canvas className="fluid-canvas -z-50" style={style} />
    </>
  );
}
