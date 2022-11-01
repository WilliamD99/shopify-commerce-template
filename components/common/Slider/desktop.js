import React, { useRef } from "react";
import Slider from "react-slick";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import SingleProduct from "./single-product";
import Skeleton from '@mui/material/Skeleton'

const NUMBER_OF_SLIDE = 3;

export default function SliderDesktop({ data, title, type }) {
    const sliderRef = useRef(null);
    const settings = {
        infinite: data.length < NUMBER_OF_SLIDE ? false : true,
        speed: 400,
        slidesToShow: NUMBER_OF_SLIDE,
        arrows: false,
        centerMode: true,
    };

    if (data.some(e => e.isLoading)) return (
        <>
            <div className="custom-slider__desktop pl-5">
                <div className="flex flex-row items-center justify-between mb-10">
                    <p className="text-2xl font-medium">{title}</p>

                </div>
                <div className="w-full grid grid-cols-4 gap-x-4">
                    {[0, 1, 2, 3].map(e => (
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
    else if (!data.some(e => e.data?.errors?.length > 0)) return (
        <div className="custom-slider__desktop pl-5">
            <div className="flex flex-row items-center justify-between mb-10">
                <p className="text-2xl font-medium">{title}</p>
                <div className="flex flex-row space-x-2 my-3">
                    {data.length > NUMBER_OF_SLIDE ? (
                        <>
                            <div
                                onClick={() => sliderRef.current.slickPrev()}
                                className="bg-slate-100 hover:bg-slate-200 ease-linear px-3 py-3 rounded-full cursor-pointer"
                            >
                                <MdArrowBackIosNew

                                />
                            </div>
                            <div
                                onClick={() => sliderRef.current.slickNext()}
                                className="bg-slate-100 hover:bg-slate-200 ease-linear px-3 py-3 rounded-full cursor-pointer"
                            >
                                <MdArrowForwardIos
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
                    <SingleProduct type={type} data={type === "id" ? e.data.data?.product : e.data.data?.productByHandle} key={`slide-${i}`} />
                ))}
            </Slider>
        </div>
    )
    else return (
        <></>
    )
}
