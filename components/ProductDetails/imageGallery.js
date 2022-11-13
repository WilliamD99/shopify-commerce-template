import React, { useContext, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import userContext from "../../utils/userContext";
import deviceContext from "../../utils/deviceContext";

import Image from "../common/Image";
import Slider from "react-slick";
import Chip from "@mui/material/Chip";
import Link from "../common/Link";
// import { SideBySideMagnifier, GlassMagnifier } from "react-image-magnifiers";

const WishlistButton = dynamic(() => import("./wishlistButton"));

export default function Gallery({ images, tag, id, index }) {
  const { user } = useContext(userContext);
  const { isMobile } = useContext(deviceContext);
  const sliderRef = useRef(null);
  const length = images.length;

  const handleImageClick = (e, i) => {
    sliderRef.current.slickGoTo(i);
  };

  let settings = {
    infinite: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    dots: isMobile ? true : false,
  };

  // Go to variant image
  useEffect(() => {
    if (index > length) {
      sliderRef.current.slickGoTo(0);
    } else {
      sliderRef.current.slickGoTo(index);
    }
  }, [index]);

  return (
    <>
      <div
        id="image-gallery"
        className="flex flex-col-reverse lg:flex-row lg:space-x-2"
      >
        <div className="flex flex-row image-collections space-x-1 md:space-x-0 lg:flex-col w-full lg:w-32 lg:space-y-2">
          {images.length > 1 ? (
            images.map((e, i) => (
              <div
                onClick={(e) => handleImageClick(e, i)}
                className="hover:opacity-70 ease-in-out relative cursor-pointer w-full h-20 md:h-24"
                key={i}
              >
                <Image
                  alt={e.node.altText}
                  layout="fill"
                  src={e.node.src}
                  placeholder="blur"
                  blurDataURL="/placeholder.webp"
                />
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
        <div className="relative image-container w-full lg:w-8/12">
          <Slider className="w-full relative" ref={sliderRef} {...settings}>
            {images.map((e, i) => (
              <div
                id="magnifier"
                className="w-full single-product__image-main relative image-gallery-main"
                key={`image-${i}`}
              >
                <Image
                  priority
                  layout="fill"
                  src={e.node.src}
                  alt={e.node.altText}
                />
              </div>
            ))}
          </Slider>
          {!user.state ? (
            <div className="absolute wishlist-button top-5 left-5">
              <WishlistButton
                id={id}
                userId={user.id}
                list={
                  user.metafields[
                    user.metafields.findIndex((e) => e.key === "wishlist")
                  ].value
                }
              />
            </div>
          ) : (
            <></>
          )}
          <div className="absolute tag-container top-5 right-5">
            <div className="flex flex-col space-y-2">
              {tag.map((e, i) => (
                <Link className="product-tag" href="#" key={`tag-${i}`}>
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
