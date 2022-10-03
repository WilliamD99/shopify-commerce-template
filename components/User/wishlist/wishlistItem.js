import React, { useEffect } from "react";

import useProductById from "../../../utils/hooks/useProductById";

import Image from "../../common/Image";
import Link from "../../common/Link";

export default function WishlistItem({ id }) {
  let product = useProductById();

  useEffect(() => {
    product.mutate({ id: id });
  }, []);

  useEffect(() => {
    if (product.data) console.log(product.data);
  }, [product.data]);

  if (product.isIdle) return <></>;
  if (product.isLoading) return <p>Loading</p>;

  return (
    <>
      <div className="flex flex-col space-y-5">
        <div className="relative h-80 w-80">
          <Image
            layout="fill"
            src={product.data.product.featuredImage.url}
            alt={product.data.product.handle}
          />
        </div>
        <Link
          href={`/product/${product.data.product.handle}`}
          className="text-lg font-semibold"
        >
          {product.data.product.title}
        </Link>
      </div>
    </>
  );
}
