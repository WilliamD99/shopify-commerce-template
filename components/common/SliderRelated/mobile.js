import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import SingleProduct from "./single-product";
import Skeleton from '@mui/material/Skeleton'

const NUMBER_OF_SLIDE = 1.5;

export default function SliderMobile({ data, title }) {
  const sliderRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const totalSlide = parseInt(data.length / NUMBER_OF_SLIDE) + 1;

  const settings = {
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: NUMBER_OF_SLIDE,
    slidesToScroll: NUMBER_OF_SLIDE,
    focusOnSelect: true,
    swipeToSlide: true,
    swipe: true,
    afterChange: (e) => {
      if (e + NUMBER_OF_SLIDE >= data.length) {
        setSlideIndex(totalSlide);
      } else {
        setSlideIndex(Math.ceil(e / NUMBER_OF_SLIDE));
      }
    },
  };

  if (data.some(e => e.isLoading)) return (
    <>
      <div className="custom-slider__desktop pl-5">
        <div className="flex flex-row items-center justify-between mb-10">
          <p className="text-2xl font-medium">{title}</p>

        </div>
        <div className="w-full grid grid-cols-2 gap-x-2">
          {[0, 1].map(e => (
            <div key={e} className="flex flex-col space-y-2">
              <Skeleton variant="rectangular" className="h-64" />
              <div className="flex flex-col">
                <Skeleton />
                <Skeleton />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
  else if (!data.some(e => e.data?.errors?.length > 0))
    return (
      <div className="custom-slider__desktop pl-2">
        <div className="flex flex-row items-center justify-between mb-10">
          <p className="text-2xl font-medium">{title}</p>
          <div className="flex flex-row items-center space-x-2 my-3">
            {data.length > NUMBER_OF_SLIDE ? (
              <>
                <div
                  onClick={() => sliderRef.current.slickPrev()}
                  className="bg-slate-100 hover:bg-slate-200 ease-linear px-3 py-3 rounded-full cursor-pointer"
                >
                  <MdArrowBackIosNew
                    className={`${slideIndex === 0 ? "text-gray-400" : "text-black"
                      }`}
                  />
                </div>
                <div
                  onClick={() => sliderRef.current.slickNext()}
                  className="bg-slate-100 hover:bg-slate-200 ease-linear px-3 py-3 rounded-full cursor-pointer"
                >
                  <MdArrowForwardIos
                    className={`${slideIndex === totalSlide ? "text-gray-400" : "text-black"
                      }`}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <Slider ref={sliderRef} {...settings}>
          {data.map((e, i) => (
            <SingleProduct data={e.data.data?.product} key={`slide-${i}`} />
          ))}
        </Slider>
      </div>
    )
  else {
    return <></>
  }
}
