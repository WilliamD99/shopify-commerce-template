import React from "react";
import Image from "../Image";
import { useQuery } from "@tanstack/react-query";
import { productById } from "../../../lib/serverRequest";

import Skeleton from "@mui/material/Skeleton";
import Link from "../Link";

export default function SingleProduct({ id, index }) {
  const { data, isLoading } = useQuery(
    [`product-${id}`],
    () => productById({ id: id }),
    { staleTime: 1000 * 60 }
  );

  if (isLoading)
    return (
      <div className="flex flex-col space-y-2">
        <Skeleton variant="rectangular" className="h-56" />
        <Skeleton />
        <Skeleton />
      </div>
    );
  if (!data.data) return <></>;

  return (
    <>
      <Link
        href={`/product/${data.data.product.handle}`}
        key={`slide-${id}-${index}`}
        className="w-11/12 flex flex-col space-y-5"
      >
        <div className="relative h-56 w-full bg-slate-100">
          <Image
            src={data.data.product.featuredImage.url}
            layout="fill"
            placeholder="blur"
            blurDataURL="/images/animated-placeholder.mp4"
          />
        </div>
        <div className="flex flex-col">
          <p>{data.data.product.title}</p>
          <p className="text-gray-400">
            {data.data.product.collections?.edges[0].node?.title}
          </p>
        </div>
      </Link>
    </>
  );
}
