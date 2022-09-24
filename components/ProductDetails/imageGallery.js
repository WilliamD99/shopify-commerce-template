import React, { useState } from "react";
import Image from "../common/Image";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Button from "@mui/material/Button";
import Slider from "react-slick";

export default function Gallery({ images }) {
  const [index, setIndex] = useState(0);
  let settings = {
    infinite: true,
    dots: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleImageClick = (target, i) => {
    setIndex(i);
  };
  const handleNextClick = (direction) => {
    // 0 -> 3
    if (direction) {
      if (index < images.length - 1) {
        setIndex((index) => (index += 1));
      } else if (index === images.length - 1) {
        setIndex(0);
      }
    } else {
      if (index > 0) {
        setIndex((index) => (index -= 1));
      } else if (index === 0) {
        setIndex(images.length - 1);
      }
    }
  };

  return (
    <div id="image-gallery" className="flex flex-col space-y-2">
      <div className="relative">
        <Slider {...settings}>
          {images.map((e, i) => (
            <div
              className="relative w-full h-80 xl:h-80 image-gallery-main"
              key={`image-${i}`}
            >
              <Image layout="fill" src={e.node.src} alt={e.node.altText} />
            </div>
          ))}
        </Slider>
      </div>

      <div
        className={`grid grid-cols-${
          images.length > 3 ? images.length : 3
        } w-full gap-x-2`}
      >
        {images.map((e, i) => (
          <div
            onClick={(target) => handleImageClick(target, i)}
            className="hover:opacity-70 ease-in-out relative cursor-pointer w-full h-20 md:h-32"
            key={i}
          >
            <Image alt={e.node.altText} layout="fill" src={e.node.src} />
          </div>
        ))}
      </div>
    </div>
  );
}
