import React, { useState, useRef } from "react";
import Image from "../common/Image";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Slider from "react-slick";
import Chip from "@mui/material/Chip";
import Link from "../common/Link";
import { SideBySideMagnifier, GlassMagnifier } from "react-image-magnifiers";

export default function Gallery({ images, tag }) {
  const sliderRef = useRef(null);
  let settings = {
    infinite: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  const handleImageClick = (e, i) => {
    sliderRef.current.slickGoTo(i);
  };

  return (
    <>
      <div id="image-gallery" className="flex flex-row space-x-2">
        <div className="flex flex-col w-32 space-y-2">
          {images.map((e, i) => (
            <div
              onClick={(e) => handleImageClick(e, i)}
              className="hover:opacity-70 ease-in-out relative cursor-pointer w-full h-20 md:h-24"
              key={i}
            >
              <Image alt={e.node.altText} layout="fill" src={e.node.src} />
            </div>
          ))}
        </div>
        <div className="relative w-5/6">
          <Slider className="w-full relative" ref={sliderRef} {...settings}>
            {images.map((e, i) => (
              <div
                id="magnifier"
                className="w-full single-product__image-main relative image-gallery-main"
                key={`image-${i}`}
              >
                <Image layout="fill" src={e.node.src} alt={e.node.altText} />
                {/* <GlassMagnifier
                // mouseActivation={MOUSE_ACTIVATION}
                // touchActivation={TOUCH_ACTIVATION}
                // dragToMove={true}
                imageSrc={e.node.src}
                imageAlt="Example"
                largeImageSrc={e.node.src} // Optional
                // allowOverflow={true}
              /> */}
              </div>
            ))}
          </Slider>
          <div className="absolute top-5 right-5">
            <div className="flex flex-col space-y-2">
              {tag.map((e, i) => (
                <Link href="#" key={`tag-${i}`}>
                  <Chip color="success" label={e} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
