import React, { useContext, useEffect, useState } from "react";
import { cartAdd } from "../../utils/utils";

import Link from "../common/Link";
import Image from "../common/Image";
import Button from "@mui/material/Button";

import cartContext from "../../utils/cartContext";

export default function SingeProduct({ e }) {
  const { setCart } = useContext(cartContext);
  const [onSale, setOnSale] = useState(false);
  console.log(e);

  useEffect(() => {
    setOnSale(
      e.node.variants.edges.some((variant) => variant.node.compareAtPrice)
    );
  }, []);

  return (
    <div className="relative flex flex-col bg-slate-50 product rounded-md">
      {onSale ? (
        <div className="absolute -top-0 -right-2 bg-red-400 rounded-full px-3 py-3 z-40">
          <p className="text-lg text-white">Sales</p>
        </div>
      ) : (
        <></>
      )}
      <div className="relative w-full h-56">
        <Image
          alt={e.node.title}
          src={e.node.featuredImage.url}
          layout="fill"
        />
      </div>
      <div className="flex flex-col justify-center items-center space-y-5 px-5 py-5">
        <a
          className="text-center text-xl font-semibold"
          href={`/product/${e.node.handle}`}
        >
          {e.node.title}
        </a>
        <p className="text-base">
          {parseFloat(e.node.priceRangeV2.minVariantPrice.amount) ===
          parseFloat(e.node.priceRangeV2.maxVariantPrice.amount)
            ? `$${parseFloat(
                e.node.priceRangeV2.minVariantPrice.amount
              ).toFixed(2)}`
            : `$${parseFloat(
                e.node.priceRangeV2.minVariantPrice.amount
              )} - $${parseFloat(e.node.priceRangeV2.maxVariantPrice.amount)}`}
        </p>
        {e.node.variants.edges.length > 1 ? (
          <Button variant="outlined" className="rounded-lg">
            <Link href={`/product/${e.node.handle}`}>Select Options</Link>
          </Button>
        ) : (
          <Button variant="outlined" className="rounded-lg">
            Add to cart
          </Button>
        )}
      </div>
    </div>
  );
}
