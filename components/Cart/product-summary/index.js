import React, { useContext, useState, useEffect } from "react";
import deviceContext from "../../../utils/deviceContext";
import cartContext from "../../../utils/cartContext";
import dynamic from "next/dynamic";

const Mobile = dynamic(() => import("./mobile"))
const Desktop = dynamic(() => import("./desktop"))

export default function ProductSummary() {
  const { isMobile } = useContext(deviceContext);
  const [cartData, setCartData] = useState();
  const { cart, setCart } = useContext(cartContext);
  // For live data update
  useEffect(() => {
    setCartData(JSON.parse(localStorage.getItem("items")));
  }, [cart]);

  return (
    <>
      {isMobile ? (
        <Mobile data={cartData} setCart={setCart} />
      ) : (
        <Desktop data={cartData} setCart={setCart} />
      )}
    </>
  );
}
