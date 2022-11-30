import React from "react";
import Image from "../Image";

import Link from "../Link";

export default function SingleProduct({ data, type }) {
  if (!data) return <></>;
  return (
    <>
      <Link
        href={`/product/${data?.handle}`}
        className="w-11/12 flex flex-col space-y-5"
      >
        <div className="relative h-64 w-full bg-slate-100">
          <Image
            src={
              type === "id" ? data?.featuredImage?.url : data?.featuredImage.src
            }
            layout="fill"
            placeholder="blur"
            blurDataURL="/placeholder.webp"
          />
        </div>
        <div className="flex flex-col">
          <p>{data.title}</p>
          <p className="text-gray-400">
            {data.collections?.edges[0]?.node?.title}
          </p>
        </div>
      </Link>
    </>
  );
}
