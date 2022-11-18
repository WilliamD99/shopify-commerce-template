import React, { useEffect, useRef, useState } from "react";
import { formatter, gsap } from "../../../utils/utils";
import { Flip } from "gsap/dist/Flip";
import { useRouter } from "next/router";

import Single from "./single";
import Image from "../../common/Image";
import { BsArrowLeft } from "react-icons/bs";
import Button from "@mui/material/Button";
import Slider from "react-slick";

const settings = {
  //   infinite: true,
  speed: 500,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
  swipe: true,
  draggable: true,
  //   centerMode: true,
};

export default function Index({ data }) {
  let [show, setShow] = useState(false);
  let [activeItem, setActiveItem] = useState();
  let [activeIndex, setActiveIndex] = useState(0);
  let router = useRouter();

  let detailsRef = useRef();
  let detailsImgRef = useRef();
  let detailsContentRef = useRef();

  let showGallery = (item, index) => {
    let details = detailsRef.current;

    Flip.fit(details, item, {
      scale: true,
    });
    const state = Flip.getState(details);
    gsap.set(details, { clearProps: true });
    gsap.set(details, {
      xPercent: -50,
      yPercent: -50,
      top: "50%",
      left: "50%",
      visibility: "visible",
      overflow: "hidden",
    });

    Flip.from(state, {
      duration: 0.5,
      ease: "power2.inOut",
      scale: true,
      onStart: () => {
        gsap.set("html", { overflow: "hidden" });
        detailsRef.current.classList.remove("invisible");
      },
      onComplete: () => {
        gsap.set(details, { overflow: "auto" });
      }, // to permit scrolling if necessary
    })
      .fromTo("#gallery_bg", { autoAlpha: 0.8 }, { autoAlpha: 0 })
      .fromTo(
        detailsImgRef.current,
        { yPercent: -20, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1 },
        0.5
      )
      .fromTo(
        "#gallery_details-contents .content",
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, stagger: 0.2, ease: "Back.easeOut" },
        0.5
      )
      .fromTo(
        "#gallery_back",
        { scale: 0 },
        { scale: 1, ease: "Back.easeOut" }
      );
    setActiveItem(item);
    setActiveIndex(index);
    setShow(!show);
  };

  let hideGallery = () => {
    let details = detailsRef.current;

    gsap.set(details, { overflow: "hidden" });
    const state = Flip.getState(details);

    Flip.fit(details, activeItem, { scale: true });

    const tl = gsap.timeline();
    tl.to(detailsImgRef.current, {
      yPercent: -20,
      autoAlpha: 0,
      duration: 0.2,
    })
      .fromTo(
        "#gallery_details-contents .content",
        { autoAlpha: 1, y: 0 },
        {
          autoAlpha: 0,
          y: 50,
          stagger: 0.2,
          ease: "back.easeOut",
          duration: 0.5,
        }
      )
      .fromTo("#gallery_bg", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });

    Flip.from(state, {
      scale: true,
      duration: 0.5,
      delay: 1.2, // 0.2 seconds because we want the details to slide up first, then flip.
      onComplete: () => {
        gsap.set("html", { overflow: "auto" });
        detailsRef.current.classList.add("invisible");
      },
    }).set(details, { visibility: "hidden" });
    setShow(false);
  };

  let handleDisplayPrice = (min, max) => {
    if (min === max) return formatter.format(min);
    else {
      return `${formatter.format(min)}-${formatter.format(max)}`;
    }
  };

  if (!data) return <></>;

  return (
    <>
      <div className="px-5 my-10 z-50 lg:px-20 grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10 relative">
        {data ? (
          data.map((e, i) => (
            <Single
              e={e}
              key={i}
              index={i}
              isShow={show}
              show={showGallery}
              hide={hideGallery}
            />
          ))
        ) : (
          <></>
        )}
        <div
          ref={detailsRef}
          id="gallery_details"
          className=" fixed px-5 py-28  grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 bg-slate-200 w-screen h-screen  border-none"
        >
          <Image
            src={data[activeIndex].node.images.edges[0].node.url}
            layout="fill"
            id="gallery_bg"
          />
          <div
            id="gallery_back"
            className="absolute z-50 top-20 left-5 lg:top-56 lg:left-20"
            onClick={hideGallery}
          >
            <p className="text-black flex flex-row items-center cursor-pointer opacity-70 hover:opacity-100 ease-linear">
              <BsArrowLeft className="mr-2" /> Go back
            </p>
          </div>
          <div className="flex justify-center">
            <div ref={detailsImgRef} className="w-full lg:py-44 lg:w-8/12">
              <Slider {...settings}>
                {data[activeIndex].node.images.edges.map((e, i) => (
                  <div
                    id="gallery_details-image"
                    className="relative h-96 lg:h-128 w-full  test overflow-hidden"
                    key={`gallery-image-${i}`}
                  >
                    <Image src={e.node.url} layout="fill" />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div
            ref={detailsContentRef}
            id="gallery_details-contents"
            className="flex flex-col justify- space-y-5 lg:py-44 lg:pr-44 content"
          >
            <div className="flex flex-col space-y-5">
              <p className="text-black text-2xl font-semibold content">
                {data[activeIndex].node.title}
              </p>
              <p className="text-black content text-lg">
                {handleDisplayPrice(
                  parseFloat(
                    data[activeIndex].node.priceRange.minVariantPrice.amount
                  ),
                  parseFloat(
                    data[activeIndex].node.priceRange.maxVariantPrice.amount
                  )
                )}
              </p>

              <div
                id="gallery_description"
                className=" flex flex-col space-y-3 content"
                data-full-text={data[activeIndex].node.descriptionHtml}
                dangerouslySetInnerHTML={{
                  __html: data[activeIndex].node.descriptionHtml,
                }}
              ></div>
            </div>
            <div className="content">
              <Button
                variant="outlined"
                className="hover:bg-white hover:text-black hover:border-white bg-black border-black text-white w-44 rounded-full normal-case ease-linear"
                onClick={() => {
                  gsap.set("html", { overflow: "auto" });
                  router.push(`/product/${data[activeIndex].node.handle}`);
                }}
              >
                More Info
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
