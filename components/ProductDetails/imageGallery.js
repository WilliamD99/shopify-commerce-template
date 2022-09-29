import React, { useState, useRef } from "react";
import Image from "../common/Image";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Slider from "react-slick";
import { SideBySideMagnifier, GlassMagnifier } from "react-image-magnifiers";

export default function Gallery({ images }) {
  const sliderRef = useRef(null);
  let settings = {
    infinite: true,
    dots: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  const handleImageClick = (i) => {
    sliderRef.current.slickGoTo(i);
  };

  return (
    <div id="image-gallery" className="flex flex-col space-y-2">
      <div className="relative">
        {/* <Slider ref={sliderRef} {...settings}> */}
        {images.map((e, i) => (
          <div
            id="magnifier"
            className="relative h-80 xl:h-80 image-gallery-main"
            key={`image-${i}`}
          >
            {/* <Image layout="fill" src={e.node.src} alt={e.node.altText} /> */}
            <GlassMagnifier
              // mouseActivation={MOUSE_ACTIVATION}
              // touchActivation={TOUCH_ACTIVATION}
              // dragToMove={true}
              imageSrc={e.node.src}
              imageAlt="Example"
              largeImageSrc={e.node.src} // Optional
              // allowOverflow={true}
            />
          </div>
        ))}
        {/* </Slider> */}
      </div>

      <div
        className={`grid grid-cols-${
          images.length > 3 ? images.length : 3
        } w-full gap-x-2 relative`}
      >
        {images.map((e, i) => (
          <div
            onClick={() => handleImageClick(i)}
            className="hover:opacity-70 ease-in-out relative cursor-pointer h-20 md:h-24"
            key={i}
          >
            <Image alt={e.node.altText} layout="fill" src={e.node.src} />
          </div>
        ))}
      </div>
    </div>
  );
}
