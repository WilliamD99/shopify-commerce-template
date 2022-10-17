import { NextSeo } from "next-seo";
import React from "react";

export default function NotFoundPage() {
  return (
    <>
      <NextSeo title="404" description="" />
      <div className="mt-44 flex flex-col items-center justify-center">
        <p className="text-3xl font-bold">404 - Page Not Found</p>
      </div>
    </>
  );
}
