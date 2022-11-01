import React from "react";
import Image from "../Image";

import Link from "../Link";

export default function SingleProduct({ data }) {
  return (
    <>
      <Link
        href={`/product/${data.handle}`}
        className="w-11/12 flex flex-col space-y-5"
      >
        <div className="relative h-64 w-full bg-slate-100">
          <Image
            src={data.featuredImage.url}
            layout="fill"
            placeholder="blur"
            blurDataURL="/images/animated-placeholder.mp4"
          />
        </div>
        <div className="flex flex-col">
          <p>{data.title}</p>
          <p className="text-gray-400">
            {data.collections?.edges[0].node?.title}
          </p>
        </div>
      </Link>
    </>
  );
}
