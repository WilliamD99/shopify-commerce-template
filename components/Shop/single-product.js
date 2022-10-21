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
  const anim = useRef(null);

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
          className="rounded-md normal-case text-xs bg-black text-white hover:border-black hover:bg-white hover:text-black absolute bottom-5 w-full md:w-40 md:left-1/2 md:-translate-x-1/2"
        >
          <Link href={`/product/${e.node.handle}`}>Select</Link>
        </Button>
      );
    } else if (e.node.totalInventory === 0) {
      return (
        <Button
          variant="outlined"
          className="rounded-md normal-case text-xs bg-white text-black absolute bottom-5 w-full md:w-40 md:left-1/2 md:-translate-x-1/2"
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
              },
              setCart
            );
            setLoading(false);
          }}
          variant="outlined"
          className="rounded-md normal-case text-xs bg-black text-white hover:border-black hover:bg-white hover:text-black absolute bottom-5 w-full md:w-40 md:left-1/2 md:-translate-x-1/2"
        >
          Add to cart
        </Button>
      );
    }
  };

  useEffect(() => {
    setOnSale(
      e.node.variants.edges.some((variant) => variant.node.compareAtPrice)
    );
  }, []);

  return (
    <div
      ref={anim}
      className="single-product relative flex flex-col md:bg-slate-100 product md:rounded-tr-md md:shadow-sm"
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
      <div className="image-container relative w-full h-56 xl:h-64 rounded-tr-md">
        <Image
          alt={e.node.title}
          src={e.node.featuredImage.url}
          layout="fill"
          placeholder="blur"
          className="rounded-tr-md"
          blurDataURL="https://prohygiene.com/usa/wp-content/uploads/sites/18/2015/12/placeholder.gif"
        />
      </div>
      <div className="flex flex-col md:justify-between space-y-3 md:px-5 py-2 md:py-5">
        <Link
          className="md:text-center text-base md:text-xl font-semibold"
          href={`/product/${e.node.handle}`}
        >
          {e.node.title}
        </Link>
        <p className="text-sm md:text-base md:text-center">
          {parseFloat(minPrice) === parseFloat(maxPrice)
            ? `${formatter.format(minPrice)}`
            : `${formatter.format(minPrice)} - ${formatter.format(maxPrice)}`}
        </p>
        <p className="text-sm invisible md:visible text-slate-400 italic text-center">
          By {e.node.vendor}
        </p>

        <div className="h-2 md:h-12 w-full">{handleDisplayButton()}</div>
      </div>
    </div>
  );
}

// useLayoutEffect(() => {
//   let from = gsap.fromTo(
//     anim.current,
//     {
//       autoAlpha: 0.1,
//       y: 30,
//     },
//     {
//       autoAlpha: 1,
//       y: 0,
//       delay: index * 0.15,
//       duration: 0.3,
//       immediateRender: false,
//       ease: "Sine.easeInOut",
//       onStart: () => anim.current.classList.remove("invisible"),
//     }
//   );
//   return () => {
//     from.kill();
//   };
// }, []);
