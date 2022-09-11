import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import { cartAdd } from "../../utils/utils";

import Link from "../common/Link";
import Image from "../common/Image";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import cartContext from "../../utils/cartContext";
import { gsap, formatter } from "../../utils/utils";
import Loading from "../Loading/dataLoading";

export default function SingeProduct({ e, index }) {
  const { setCart } = useContext(cartContext);
  const [onSale, setOnSale] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const anim = useRef(null);

  let minPrice = e.node.priceRangeV2 ? e.node.priceRangeV2.minVariantPrice.amount : e.node.priceRange.minVariantPrice.amount
  let maxPrice = e.node.priceRangeV2 ? e.node.priceRangeV2.maxVariantPrice.amount : e.node.priceRange.maxVariantPrice.amount

  useLayoutEffect(() => {
    let from = gsap.fromTo(
      anim.current,
      {
        autoAlpha: 0.1,
        y: 30,
      },
      {
        autoAlpha: 1,
        y: 0,
        delay: index * 0.2,
        duration: 0.3,
        immediateRender: false,
        ease: "Sine.easeInOut",
        onStart: () => anim.current.classList.remove("invisible"),
      }
    );
    return () => {
      from.kill();
    };
  }, []);

  useEffect(() => {
    setOnSale(
      e.node.variants.edges.some((variant) => variant.node.compareAtPrice)
    );
  }, []);

  return (
    <div
      ref={anim}
      className="single-product invisible relative flex flex-col bg-slate-100 product rounded-md border-2 shadow-sm"
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

      {/* If product is on sales */}
      {onSale ? (
        <div className="absolute -top-0 -right-2 bg-red-400 rounded-full px-3 py-3 z-40">
          <p className="text-lg text-white">Sales</p>
        </div>
      ) : (
        <></>
      )}
      <div className="image-container relative w-full h-56 xl:h-64">
        <Image
          alt={e.node.title}
          src={e.node.featuredImage.url}
          layout="fill"
          placeholder="blur"
          blurDataURL="https://prohygiene.com/usa/wp-content/uploads/sites/18/2015/12/placeholder.gif"
        />
      </div>
      <div className="flex flex-col justify-between space-y-3 px-5 py-5">
        <div>
          <div className="flex flex-row my-1 flex-wrap space-y-2">
            {e.node.collections.edges.map((col) => (
              <Link
                href={`/shop/products-in-collection?col=${col.node.id}`}
                key={col.node.title}
              >
                <Chip
                  label={col.node.title}
                  variant="outlined"
                  className="text-sm cursor-pointer"
                />
              </Link>
            ))}
          </div>
          <Link
            className="text-center text-xl font-semibold"
            href={`/product/${e.node.handle}`}
          >
            {e.node.title}
          </Link>
        </div>
        <p className="text-base">
          {
          parseFloat(minPrice) === parseFloat(maxPrice)
          ? `${formatter.format(minPrice)}`
          : `${formatter.format(minPrice)} - ${formatter.format(maxPrice)}`}
        </p>
        <p className="text-sm text-slate-400 italic">By {e.node.vendor}</p>

        <div className="h-16">
          {e.node.variants.edges.length > 1 ? (
            <Button variant="outlined" className="rounded-lg absolute bottom-5">
              <Link href={`/product/${e.node.handle}`}>Select Options</Link>
            </Button>
          ) : (
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
                    variantTitle: ""
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
  );
}
