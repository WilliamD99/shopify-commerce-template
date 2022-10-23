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

  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    productHook.mutate({ id: data });
  }, []);

  useEffect(() => {
    if (productHook.data) setProductData(productHook.data.product);
  }, [productHook.isLoading]);

  if (productHook.isLoading || !productData) return <Loading />;

  return (
    <>
      <div className="relative pb-5 flex flex-col items-center md:mr-3 bg-slate-100">
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
            blurDataURL="https://prohygiene.com/usa/wp-content/uploads/sites/18/2015/12/placeholder.gif"
          />
        </div>
        <div className="px-5 flex flex-col mt-2">
          <p
            onClick={() => {
              router.push(`/product/${productData.handle}`);
              refreshData();
            }}
            // href={`/product/${productData.handle}`}
            className="text-lg font-medium text-center"
          >
            {productData.title}
          </p>

          <p className="text-base text-center">
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

          <p className="text-sm text-slate-400 italic text-center">
            By {productData.vendor}
          </p>

          <div className="h-16">
            {productData.variants.edges.length > 1 ? (
              <Button
                variant="outlined"
                className="rounded-lg absolute bottom-5"
              >
                <Link href={`/product/${productData.handle}`}>
                  Select Options
                </Link>
              </Button>
            ) : (
              <Button
                onClick={async () => {
                  setLoading(true);
                  await cartAdd(
                    {
                      title: productData.title,
                      merchandiseId: productData.variants.edges[0].node.id,
                      quantity: 1,
                      price: productData.variants.edges[0].node.price,
                      image: productData.featuredImage.url,
                      variantTitle: "",
                    },
                    setCart
                  );
                  setLoading(false);
                }}
                variant="outlined"
                className="rounded-lg absolute bottom-5"
              >
                Add to cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
