import React, { useRef, useContext, useCallback } from "react";
import deviceContext from "../../../utils/deviceContext";
import { Skeleton } from "@mui/material";
import Slider from "react-slick";
import Image from "../../common/Image";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import Link from "../../common/Link";
import { formatter } from "../../../utils/utils";

export default function HomeSlider({ data }) {
  const { isMobile } = useContext(deviceContext);
  const NUMBER_OF_SLIDE = isMobile ? 1 : 4;
  const sliderRef = useRef(null);
  const settings = {
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: NUMBER_OF_SLIDE,
    slidesToScroll: NUMBER_OF_SLIDE,
    focusOnSelect: true,
    swipeToSlide: true,
    swipe: true,
    centerMode: true,
    draggable: true,
  };
  const handlePriceDisplay = useCallback((max, min) => {
    if (max === min) return formatter.format(max);
    else {
      return `${formatter.format(min)}-${formatter.format(max)}`;
    }
  }, []);

  if (data.isLoading) {
    return (
      <div className="px-5 lg:px-20 mt-10">
        <Skeleton className="w-44" />
        <div className="flex flex-row items-center justify-between pr-5 mb-5">
          <Link href="#" className="text-2xl font-medium hover:opacity-80">
            {data?.data?.data.collection.title}
          </Link>
        </div>
        <div className={`grid grid-cols-${NUMBER_OF_SLIDE} gap-x-2 `}>
          {(isMobile ? [0, 1] : [0, 1, 2, 3]).map((e) => (
            <div key={e} className="flex flex-col space-y-2">
              <Skeleton variant="rectangular" className="h-64 lg:h-80" />
              <div className="flex flex-col">
                <Skeleton />
                <Skeleton />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (data.isSuccess && data.data)
    return (
      <div className="home-slider px-5 lg:px-20 mt-10">
        <div className="flex flex-row items-center justify-between pr-5 mb-5">
          <Link
            href={`/shop/${data.data.data.collection.handle}`}
            className="text-2xl font-medium hover:opacity-80"
          >
            {data.data.data.collection.title}
          </Link>
          <div className="flex flex-row items-center space-x-2 my-3">
            {data.data.data?.collection.products.edges.length >
            NUMBER_OF_SLIDE ? (
              <>
                <div
                  onClick={() => sliderRef.current.slickPrev()}
                  className="bg-slate-100 hover:bg-slate-200 ease-linear px-3 py-3 rounded-full cursor-pointer"
                >
                  <MdArrowBackIosNew className="text-xs lg:text-xl" />
                </div>
                <div
                  onClick={() => sliderRef.current.slickNext()}
                  className="bg-slate-100 hover:bg-slate-200 ease-linear px-3 py-3 rounded-full cursor-pointer"
                >
                  <MdArrowForwardIos className="text-xs lg:text-xl" />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <Slider ref={sliderRef} {...settings}>
          {data.data.data?.collection.products.edges.map((e, i) => (
            <Link
              href={`/product/${e.node.handle}`}
              className="w-11/12 flex flex-col space-y-5"
              key={`product-${i}`}
            >
              <div className="relative h-64 lg:h-80">
                <Image
                  src={e.node.featuredImage.url}
                  layout="fill"
                  placeholder="blur"
                  blurDataURL="/placeholder.webp"
                />
              </div>
              <div className="flex flex-col lg:flex-row lg:justify-between space-y-1">
                <div>
                  <p className="lg:text-lg">{e.node.title}</p>
                  <p className="text-gray-400 lg:text-lg">
                    {e.node.collections?.edges[0].node?.title}
                  </p>
                </div>
                <p className="text-sm lg:text-base lg:pr-3">
                  {handlePriceDisplay(
                    e.node.priceRange.maxVariantPrice.amount,
                    e.node.priceRange.minVariantPrice.amount
                  )}
                </p>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    );
  else {
    return <></>;
  }
}
