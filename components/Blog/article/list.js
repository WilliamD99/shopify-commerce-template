import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Image from "../../common/Image";
import Link from "../../common/Link";
import ListPagination from "./list_pagination";

export default function ArticleList({ isLoading, data }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-5 lg:gap-y-10 mt-10 px-5 lg:px-20">
        <div className="flex flex-row-reverse lg:flex-col justify-between space-y-5 space-x-5 lg:space-x-0 mb-5">
          <Skeleton variant="rectangular" className="h-32 w-full lg:h-96 self-center" />
          <div className="flex flex-col lg:space-y-1 w-full">
            <Skeleton className="lg:w-5/12 w-7/12" />
            <Skeleton className="lg:w-1/2 w-3/4" />
            <Skeleton className="lg:w-5/12 w-7/12" />
          </div>
        </div>
        <div className="flex flex-row-reverse lg:flex-col justify-between space-y-5 space-x-5 lg:space-x-0 mb-5">
          <Skeleton variant="rectangular" className="h-32 w-full lg:h-96 self-center" />
          <div className="flex flex-col lg:space-y-1 w-full">
            <Skeleton className="lg:w-5/12 w-7/12" />
            <Skeleton className="lg:w-1/2 w-3/4" />
            <Skeleton className="lg:w-5/12 w-7/12" />
          </div>
        </div>
        <div className="flex flex-row-reverse lg:flex-col justify-between space-y-5 space-x-5 lg:space-x-0 mb-5">
          <Skeleton variant="rectangular" className="h-32 w-full lg:h-96 self-center" />
          <div className="flex flex-col lg:space-y-1 w-full">
            <Skeleton className="lg:w-5/12 w-7/12" />
            <Skeleton className="lg:w-1/2 w-3/4" />
            <Skeleton className="lg:w-5/12 w-7/12" />
          </div>
        </div>
        <div className="flex flex-row-reverse lg:flex-col justify-between space-y-5 space-x-5 lg:space-x-0 mb-5">
          <Skeleton variant="rectangular" className="h-32 w-full lg:h-96 self-center" />
          <div className="flex flex-col lg:space-y-1 w-full">
            <Skeleton className="lg:w-5/12 w-7/12" />
            <Skeleton className="lg:w-1/2 w-3/4" />
            <Skeleton className="lg:w-5/12 w-7/12" />
          </div>
        </div>
        <div className="flex flex-row-reverse lg:flex-col justify-between space-y-5 space-x-5 lg:space-x-0 mb-5">
          <Skeleton variant="rectangular" className="h-32 w-full lg:h-96 self-center" />
          <div className="flex flex-col lg:space-y-1 w-full">
            <Skeleton className="lg:w-5/12 w-7/12" />
            <Skeleton className="lg:w-1/2 w-3/4" />
            <Skeleton className="lg:w-5/12 w-7/12" />
          </div>
        </div>
      </div>
    );
  }
  if (data.articles.edges.length === 0) {
    return (
      <div className="mt-10">
        <p className="text-center">Sorry for the inconvenience, but nothing match your selection</p>
      </div>
    )
  }

  return (
    <>
      <div className="mt-10 px-5 lg:px-20 grid grid-cols-1 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-10">
        {data.articles.edges.map((e, i) => (
          <Link
            href={`/blogs/${e.node.blog.handle}/${e.node.handle}`}
            className="flex flex-row-reverse lg:flex-col justify-between space-y-5 space-x-5 lg:space-x-0 mb-5"
            key={`article-${i}`}
          >
            <div className="relative h-20 lg:h-96 w-1/2 lg:w-full rounded-xl overflow-hidden self-center mx-5 lg:mx-0">
              <Image
                layout="fill"
                src={e.node.image.url}
                placeholder="blur"
                blurDataURL="/placeholder.webp"
              />
            </div>
            <div className="flex flex-col justify-center w-11/12 lg:w-full space-y-2">
              <p className="text-xs lg:text-sm text-gray-500">{e.node.blog.title}</p>
              <p className="lg:text-xl font-medium">{e.node.title}</p>
              <p className="text-xs lg:text-sm text-gray-500">{new Date(e.node.publishedAt).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
      </div>
      <ListPagination hasNextPage={data.articles.pageInfo.hasNextPage} hasPreviousPage={data.articles.pageInfo.hasPreviousPage} />
    </>
  );
}