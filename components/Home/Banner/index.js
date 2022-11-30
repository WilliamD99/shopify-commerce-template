import React, { useState, useEffect } from "react";
import Image from "../../common/Image";
import Button from "@mui/material/Button";

import { useRouter } from "next/router";

export default function Banner({ link, title, image, height, className }) {
  const [inProp, setInProp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setInProp(!inProp);
  }, []);

  return (
    <>
      <div className={`px-5 ${className ? className : ""} overflow-hidden banner-container`}>
        <div
          className={`${height ? `h-${height}` : "h-64"
            } banner-container__image w-full relative cursor-pointer grayscale overflow-hidden hover:grayscale-0 ease-in-out`}
          onClick={() => router.push(link)}
        >
          <Image src={image} layout="fill" priority className="hover:scale-110" />
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
