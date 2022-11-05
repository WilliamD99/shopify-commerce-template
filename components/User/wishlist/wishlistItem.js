import React from "react";

import { useQuery } from "@tanstack/react-query";
import { productById } from '../../../lib/serverRequest'

import Image from "../../common/Image";
import Link from "../../common/Link";
import Skeleton from '@mui/material/Skeleton'

export default function WishlistItem({ id }) {
  const { data, isLoading } = useQuery(['product', id], () => productById({ id: id }))

  if (isLoading) return <>
    <div className="flex flex-col space-y-2 ">
      <Skeleton variant="rectangular" className="relative h-80 w-80" />
      <Skeleton
        className="w-80"
      />
    </div>
  </>
  else if (!data) return <>
  </>
  else {
    return (
      <>
        <div className="flex flex-col space-y-5">
          <div className="relative h-80 w-80">
            <Image
              layout="fill"
              src={data.data.product.featuredImage.url}
              alt={data.data.product.handle}
              placeholder="blur"
              blurDataURL="/placeholder.webp"
            />
          </div>
          <Link
            href={`/product/${data.data.product.handle}`}
            className="text-lg font-semibold"
          >
            {data.data.product.title}
          </Link>
        </div>
      </>
    );
  }
}
