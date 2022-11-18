import React, { useRef, useState } from 'react'
import { gsap } from '../../../utils/utils'
import { Flip } from 'gsap/dist/Flip'

import Single from './single'
import Image from '../../common/Image'
import { BsArrowLeft } from 'react-icons/bs'
import Button from '@mui/material/Button'

export default function Index({ data }) {
    let [show, setShow] = useState(false)
    let [activeItem, setActiveItem] = useState()

    let detailsRef = useRef()
    let detailsImgRef = useRef()
    let detailsContentRef = useRef()

    let showGallery = (item) => {
        let details = detailsRef.current

        Flip.fit(details, item, { scale: true })
        const state = Flip.getState(details)
        gsap.set(details, { clearProps: true })
        gsap.set(details, { xPercent: -50, yPercent: -50, top: "50%", left: "50%", visibility: "visible", overflow: "hidden" });

        Flip.from(state, {
            duration: 0.5,
            ease: "power2.inOut",
            scale: true,
            onStart: () => detailsRef.current.classList.remove("invisible"),
            onComplete: () => gsap.set(details, { overflow: "auto" }) // to permit scrolling if necessary
        })
            .fromTo(detailsImgRef.current, { yPercent: -50, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1 }, 0.5)
            .fromTo("#gallery_details-contents .content", { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, stagger: 0.2, ease: "Back.easeOut" }, 0.5)
            .fromTo("#gallery_back", { scale: 0 }, { scale: 1, ease: "Back.easeOut" })
        setActiveItem(item)
        setShow(!show)
    }

    let hideGallery = () => {
        let details = detailsRef.current

        gsap.set(details, { overflow: "hidden" })
        const state = Flip.getState(details)

        Flip.fit(details, activeItem, { scale: true })

        const tl = gsap.timeline()
        tl
            .to(detailsImgRef.current, { yPercent: -50, autoAlpha: 0, duration: 0.2 })
            .fromTo("#gallery_details-contents .content", { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: 50, stagger: 0.2, ease: "back.easeOut", duration: 0.5 })

        Flip.from(state, {
            scale: true,
            duration: 0.5,
            delay: 0.85, // 0.2 seconds because we want the details to slide up first, then flip.
            onComplete: () => detailsRef.current.classList.add("invisible"),
        })
            .set(details, { visibility: "hidden" });
        setShow(false)
    }

    return (
        <>
            <div className='px-5 lg:px-20 grid grid-cols-1 lg:grid-cols-3 gap-10 relative'>
                {
                    data ?
                        data.map((e, i) => (
                            <Single e={e} key={i} isShow={show} show={showGallery} hide={hideGallery} />
                        ))
                        :
                        <></>
                }
                <div ref={detailsRef} id="gallery_details" className="invisible fixed px-5 py-10 pt-16 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 lg:overflow-hidden bg-gray-700 w-screen h-screen  border-none">
                    <div id="gallery_back" className='absolute top-5 left-5 lg:top-10 lg:left-10' onClick={hideGallery}>
                        <p className='text-white flex flex-row items-center cursor-pointer opacity-70 hover:opacity-100 ease-linear'>
                            <BsArrowLeft className='mr-2' /> Go back
                        </p>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div ref={detailsImgRef} id="gallery_details-image" className='relative h-96 w-96 lg:h-128 lg:w-128 test overflow-hidden'>
                            <Image src="/placeholder.webp" layout="fill" />
                        </div>
                    </div>
                    <div ref={detailsContentRef} id="gallery_details-contents" className='flex flex-col justify-between space-y-5 lg:py-56 lg:pr-20'>
                        <div className='flex flex-col space-y-5'>
                            <p className="text-white text-2xl font-semibold content">
                                Default Title
                            </p>
                            <p className='text-white content'>$20 - $25</p>
                            <p className='text-white content'>Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Nulla porttitor accumsan tincidunt. Cras ultricies ligula sed magna dictum porta. Donec rutrum congue leo eget malesuada. Donec sollicitudin molestie malesuada. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla porttitor accumsan tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Proin eget tortor risus.</p>
                        </div>
                        <div className='content'>
                            <Button variant="outlined" className='bg-white text-black w-44 rounded-full normal-case ease-linear hover:scale-110'>More Info</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
