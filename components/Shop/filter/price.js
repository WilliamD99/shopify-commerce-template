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
    delete routerQuery['cursor']
    delete routerQuery['direction']
    delete routerQuery['reversed']

    router.push(
      {
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
        <Button className="text-black" onClick={handleApply}>
          Apply
        </Button>
      </div>
    </>
  );
}
