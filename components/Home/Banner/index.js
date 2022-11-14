import React from "react";
import Image from "../../common/Image";
import Button from "@mui/material/Button";

import { useRouter } from "next/router";

export default function Banner({ link, title, image, height, className }) {
  const router = useRouter();

  return (
    <>
      <div className={`px-5 ${className ? className : ""}`}>
        <div
          className={`${
            height ? `h-${height}` : "h-64"
          } w-full relative cursor-pointer`}
          onClick={() => router.push(link)}
        >
          <Image src={image} layout="fill" priority />
          {title ? (
            <Button className="text-black bg-white absolute left-1/2 -translate-x-1/2 bottom-5 px-5 rounded-xl shadow-2xl hover:bg-black hover:text-white">
              {title}
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
