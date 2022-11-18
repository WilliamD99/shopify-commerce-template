import React, { useRef } from "react";
import Image from "../../common/Image";

export default function Single({ e, hide, show, isShow, index }) {
  let singleRef = useRef();
  return (
    <>
      <div
        ref={singleRef}
        className="flex flex-col lg:space-y-5 bg-transparent cursor-pointer"
        onClick={() => {
          if (!isShow) {
            show(singleRef.current, index);
          } else {
            hide();
          }
        }}
      >
        <div className="relative h-56 lg:h-72 w-full lg:w-11/12 ">
          <Image src={e.node.featuredImage.url} layout="fill" />
        </div>
      </div>
    </>
  );
}
