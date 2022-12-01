import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Image from "../../common/Image";
import Link from "../../common/Link";
import ListPagination from "./list_pagination";

export default function ArticleList({ isLoading, data }) {
  console.log(data);
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-x-5 gap-y-10 mt-10 px-20">
        <div className="flex flex-col space-y-5 mb-5">
          <Skeleton variant="rectangular" className="h-96" />
          <div className="flex flex-col space-y-1">
            <Skeleton className="w-5/12" />
            <Skeleton className="w-1/2" />
            <Skeleton className="w-5/12" />
          </div>
        </div>
        <div className="flex flex-col space-y-5 mb-5">
          <Skeleton variant="rectangular" className="h-96" />
          <div className="flex flex-col space-y-1">
            <Skeleton className="w-5/12" />
            <Skeleton className="w-1/2" />
            <Skeleton className="w-5/12" />
          </div>
        </div>
        <div className="flex flex-col space-y-5 mb-5">
          <Skeleton variant="rectangular" className="h-96" />
          <div className="flex flex-col space-y-1">
            <Skeleton className="w-5/12" />
            <Skeleton className="w-1/2" />
            <Skeleton className="w-5/12" />
          </div>
        </div>
        <div className="flex flex-col space-y-5 mb-5">
          <Skeleton variant="rectangular" className="h-96" />
          <div className="flex flex-col space-y-1">
            <Skeleton className="w-5/12" />
            <Skeleton className="w-1/2" />
            <Skeleton className="w-5/12" />
          </div>
        </div>
        <div className="flex flex-col space-y-5 mb-5">
          <Skeleton variant="rectangular" className="h-96" />
          <div className="flex flex-col space-y-1">
            <Skeleton className="w-5/12" />
            <Skeleton className="w-1/2" />
            <Skeleton className="w-5/12" />
          </div>
        </div>
        <div className="flex flex-col space-y-5 mb-5">
          <Skeleton variant="rectangular" className="h-96" />
          <div className="flex flex-col space-y-1">
            <Skeleton className="w-5/12" />
            <Skeleton className="w-1/2" />
            <Skeleton className="w-5/12" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-10 px-20 grid grid-cols-3 gap-x-5 gap-y-10">
        {data.articles.edges.map((e, i) => (
          <Link
            href="#"
            className="flex flex-col space-y-5 mb-5"
            key={`article-${i}`}
          >
            <div className="relative h-96 w-full rounded-xl overflow-hidden">
              <Image
                layout="fill"
                src={e.node.image.url}
                placeholder="blur"
                blurDataURL="/placeholder.webp"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-gray-500">{e.node.blog.title}</p>
              <p className="text-xl font-medium">{e.node.title}</p>
              <p className="text-sm text-gray-500">{e.node.publishedAt}</p>
            </div>
          </Link>
        ))}
      </div>
      <ListPagination />
    </>
  );
}
