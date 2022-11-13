import React, { useContext, useEffect, useState, useRef } from "react";
import { cartAdd } from "../../utils/utils";

import Link from "../common/Link";
import Image from "../common/Image";
import Button from "@mui/material/Button";
import WishlistButton from "../ProductDetails/wishlistButton";

import cartContext from "../../utils/cartContext";
import { formatter } from "../../utils/utils";
import Loading from "../Loading/dataLoading";
import userContext from "../../utils/userContext";

export default function SingeProduct({ e, index }) {
  const { setCart } = useContext(cartContext);
  const { user } = useContext(userContext);
  const [onSale, setOnSale] = useState(false);
  const [isLoading, setLoading] = useState(false);

  console.log(e);

  let minPrice = e.node.priceRangeV2
    ? e.node.priceRangeV2.minVariantPrice.amount
    : e.node.priceRange.minVariantPrice.amount;
  let maxPrice = e.node.priceRangeV2
    ? e.node.priceRangeV2.maxVariantPrice.amount
    : e.node.priceRange.maxVariantPrice.amount;

  let handleDisplayButton = () => {
    if (e.node.variants.edges.length > 1) {
      return (
        <Button
          variant="outlined"
          className="rounded-full normal-case text-xs md:text-base bg-black text-white hover:border-black hover:bg-white hover:text-black absolute bottom-5 w-full md:w-40 md:left-1/2 md:-translate-x-1/2"
        >
          <Link href={`/product/${e.node.handle}`}>Select</Link>
        </Button>
      );
    } else if (e.node.totalInventory === 0) {
      return (
        <Button
          variant="outlined"
          className="rounded-full normal-case text-xs md:text-base bg-gray-300 border-gray-300 absolute bottom-5 w-full md:w-40 md:left-1/2 md:-translate-x-1/2"
          disabled={true}
        >
          Sold out
        </Button>
      );
    } else {
      return (
        <Button
          onClick={async () => {
            setLoading(true);
            await cartAdd(
              {
                title: e.node.title,
                merchandiseId: e.node.variants.edges[0].node.id,
                quantity: 1,
                price: e.node.variants.edges[0].node.price,
                image: e.node.featuredImage.url,
                variantTitle: "",
                handle: e.node.handle,
                productId: e.node.id,
              },
              setCart
            );
            setLoading(false);
          }}
          variant="outlined"
          className="rounded-full normal-case text-xs md:text-base bg-black text-white hover:border-black hover:bg-white hover:text-black absolute bottom-5 w-full md:w-40 md:left-1/2 md:-translate-x-1/2"
        >
          Add to cart
        </Button>
      );
    }
  };

  let handleHoverEffect = () => {};

  useEffect(() => {
    setOnSale(
      e.node.variants.edges.some((variant) => variant.node.compareAtPrice)
    );
  }, []);

  return (
    <Link
      href={`/product/${e.node.handle}`}
      className="single-product relative flex flex-col product md:rounded-tr-md"
    >
      {/* If product is loading */}
      {isLoading ? (
        <>
          <Loading />
          <div className="absolute w-full h-full top-0 left-0 backdrop-blur-sm z-40"></div>
        </>
      ) : (
        <></>
      )}

      {!user.state ? (
        <div className="absolute wishlist-button top-5 left-5 z-50">
          <WishlistButton
            id={e.node.id}
            userId={user.id}
            list={
              user.metafields[
                user.metafields.findIndex((e) => e.key === "wishlist")
              ].value
            }
          />
        </div>
      ) : (
        <></>
      )}

      {/* If product is on sales */}
      {onSale ? (
        <div className="absolute top-0 right-0 bg-red-400 rounded-tr-md rounded-bl-md px-2 py-2 z-40">
          <p className="text-xs md:text-sm text-white">Sales</p>
        </div>
      ) : (
        <></>
      )}
      <div className="image-container relative w-full h-56 xl:h-112 rounded-tr-md">
        <Image
          alt={e.node.title}
          src={e.node.featuredImage.url}
          layout="fill"
          className="rounded-tr-md"
          placeholder="blur"
          blurDataURL="/placeholder.webp"
        />
      </div>
      <div className="flex flex-col md:justify-between space-y-4 py-2 md:py-5">
        <div className="flex flex-col space-y-1">
          <div className=" text-base md:text-xl font-semibold">
            {e.node.title}
          </div>
          <p className="text-sm text-slate-400 italic">By {e.node.vendor}</p>
        </div>
        <p className="text-sm md:text-base">
          {parseFloat(minPrice) === parseFloat(maxPrice)
            ? `${formatter.format(minPrice)}`
            : `${formatter.format(minPrice)} - ${formatter.format(maxPrice)}`}
        </p>

        {/* <div className="h-2 md:h-12 w-full">{handleDisplayButton()}</div> */}
      </div>
    </Link>
  );
}
