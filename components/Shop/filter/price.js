import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";

export default function PriceFilter({ setPrice, price }) {
  const router = useRouter();
  const routerQuery = router.query;

  useEffect(() => {
    if (router.isReady && routerQuery.price) {
      let valueURI = routerQuery.price.split(",");
      if (setPrice) {
        setPrice([parseInt(valueURI[0]), parseInt(valueURI[1])]);
      }
    }
  }, [routerQuery]);

  const handleChange = (event, newValue) => {
    setPrice(newValue);
  };

  const handleApply = () => {
    routerQuery.price = `${price[0]},${price[1]}`;
    if (!routerQuery.reverse) routerQuery.reverse = false;
    if (routerQuery.cursor) delete routerQuery.cursor;

    router.push(
      {
        // pathname: window.location.pathname,
        query: routerQuery,
      },
      undefined
    );
  };

  return (
    <>
      <Slider
        getAriaLabel={() => "Price range"}
        value={price}
        onChange={handleChange}
        valueLabelDisplay="auto"
        disableSwap
        min={0}
        max={1000}
        step={10}
      />
      <div className="flex justify-end">
        <Button onClick={handleApply}>Apply</Button>
      </div>
    </>
  );
}
