import React, { useRef, useState } from 'react'
import Slider from "react-slick";
import { MdArrowForwardIos, MdArrowBackIosNew } from 'react-icons/md'
import Image from '../../common/Image'

const NUMBER_OF_SLIDE = 3.5

export default function SliderDesktop({ data }) {
    const sliderRef = useRef(null)
    const [slideIndex, setSlideIndex] = useState(0)
    const totalSlide = (parseInt(data.length / NUMBER_OF_SLIDE) + 1)

    const settings = {
        infinite: false,
        speed: 400,
        slidesToShow: NUMBER_OF_SLIDE,
        slidesToScroll: NUMBER_OF_SLIDE,
        arrows: false,
        afterChange: (e) => {
            if (e + NUMBER_OF_SLIDE >= data.length) {
                setSlideIndex(totalSlide)
            } else {
                setSlideIndex(Math.ceil(e / NUMBER_OF_SLIDE))
            }
        }
    };

    return (
        <div className='custom-slider__desktop pl-5'>
            <div className='flex flex-row space-x-2 my-3'>
                <div onClick={() => sliderRef.current.slickPrev()} className='bg-slate-100 hover:bg-slate-200 ease-linear px-3 py-3 rounded-full cursor-pointer'>
                    <MdArrowBackIosNew className={`${slideIndex === 0 ? "text-gray-400" : "text-black"}`} />
                </div>
                <div onClick={() => sliderRef.current.slickNext()} className='bg-slate-100 hover:bg-slate-200 ease-linear px-3 py-3 rounded-full cursor-pointer'>
                    <MdArrowForwardIos className={`${slideIndex === totalSlide ? "text-gray-400" : "text-black"}`} />
                </div>
            </div>
            <Slider ref={sliderRef} {...settings}>
                {data.map((e, i) => (
                    <div key={`slide-${i}`} className='w-11/12 flex flex-col space-y-2'>
                        <div className='relative h-56 w-full bg-slate-100'>
                            <Image
                                src="/placeholder.webp"
                                layout="fill"
                                placeholder="blur"
                                blurDataURL="/images/animated-placeholder.mp4"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <p>Test-{e}</p>
                            <p className='text-gray-400'>Test-{e}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}
