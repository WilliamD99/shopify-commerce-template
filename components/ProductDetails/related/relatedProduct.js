import React, { useEffect, useState, useContext } from "react";
import cartContext from "../../../utils/cartContext";
import { formatter, cartAdd } from "../../../utils/utils";
import { useRouter } from "next/router";

import useProductById from "../../../utils/hooks/useProductById";

import Loading from "../../Loading/dataLoading";
import Image from "../../common/Image";
import Link from "../../common/Link";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

export default function Product({ data }) {
  let [productData, setProductData] = useState();
  let { setCart } = useContext(cartContext);
  const [isLoading, setLoading] = useState(false);
  let productHook = useProductById();
  const router = useRouter();

  useEffect(() => {
    productHook.mutate({ id: data });
  }, []);

  useEffect(() => {
    if (productHook.data) setProductData(productHook.data.product);
  }, [productHook.isLoading]);

  if (productHook.isLoading || !productData) return <Loading />;

  return (
    <>
      <div className="relative pb-5 flex flex-col md:mr-3">
        {/* If product is loading */}
        {isLoading ? (
          <>
            <Loading />
            <div className="absolute w-full h-full top-0 left-0 backdrop-blur-sm z-40"></div>
          </>
        ) : (
          <></>
        )}
        <div className="image-container relative w-full h-64">
          <Image
            alt={productData.title}
            src={productData.featuredImage.url}
            layout="fill"
            placeholder="blur"
            blurDataURL="/placeholder.webp"
          />
        </div>
        <div className="flex flex-col mt-5">
          <Link
            href={`/product/${productData.handle}`}
            className="text-base font-medium"
          >
            {productData.title}
          </Link>
          <p className="text-sm text-slate-400 italic">
            By {productData.vendor}
          </p>
          <p className="text-base">
            {parseFloat(productData.priceRangeV2.minVariantPrice.amount) ===
            parseFloat(productData.priceRangeV2.maxVariantPrice.amount)
              ? `${formatter.format(
                  productData.priceRangeV2.minVariantPrice.amount
                )}`
              : `${formatter.format(
                  productData.priceRangeV2.minVariantPrice.amount
                )} - ${formatter.format(
                  productData.priceRangeV2.maxVariantPrice.amount
                )}`}
          </p>
        </div>
      </div>
    </>
  );
}
