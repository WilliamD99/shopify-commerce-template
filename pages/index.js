import React, { useContext, useEffect, useState } from "react";
import deviceContext from "../utils/deviceContext";
import { useQueries } from "@tanstack/react-query";
import { productInCollection } from "../utils/api/requests";

import Image from "../components/common/Image";
import Banner from "../components/Home/Banner";
import Slider from "../components/Home/Slider";
import Button from "@mui/material/Button";
import { productsGet } from "../lib/serverRequest";
import AnimatedGallery from "../components/Animation/Gallery";
import FluidBackground from "../components/Animation/FluidBackground";
import { Transition } from "react-transition-group";
import { gsap } from "../utils/utils";
import Link from "../components/common/Link";
import TextReveal from "../components/Animation/TextReveal";

export default function Index() {
  const { isMobile } = useContext(deviceContext);
  const [show, setShow] = useState(false);

  const data = useQueries({
    queries: [
      {
        queryKey: ["collection", "disposable"],
        queryFn: () => productInCollection({ handle: "disposable", limit: 7 }),
        staleTime: 1000 * 60 * 60 * 12,
      },
      {
        queryKey: ["collection", "newest-release"],
        queryFn: () =>
          productInCollection({ handle: "newest-release", limit: 7 }),
        staleTime: 1000 * 60 * 60 * 12,
      },
      {
        queryKey: ["product", "featured"],
        queryFn: () => productsGet({ limit: 7, tags: "featured" }),
        staleTime: 1000 * 60 * 60 * 12,
      },
    ],
  });

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>
      <div className="relative h-128 lg:h-screen w-screen flex flex-col justify-center items-center bg-black">
        <div className="absolute top-0 left-0 h-full w-full">
          <FluidBackground />
        </div>
        <Transition
          timeout={1000}
          mountOnEnter
          unmountOnExit
          in={show}
          addEndListener={(node, done) => {
            gsap.fromTo(
              ".banner-content",
              {
                y: show ? 100 : 0,
                autoAlpha: show ? 0 : 1,
              },
              {
                y: show ? 0 : 100,
                autoAlpha: show ? 1 : 0,
                onComplete: done,
                delay: 0.5,
                stagger: 0.1,
              }
            );
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-5 lg:space-y-10 w-10/12 lg:w-1/2">
            <TextReveal
              stagger={0.5}
              className="flex flex-col justify-center items-center space-y-5"
            >
              <p className="text-white text-xl lg:text-3xl text-center font-semibold banner-content">
                Welcome to Ecommerce Template
              </p>
              <p className="text-white text-sm lg:text-base text-center banner-content">
                We offer quality e-cigarettes, e-juice, disposables, nicotine
                salts and much more for both pickup and shipping. Your order is
                FREE if over <strong>$100</strong> (+tax).
              </p>
              <p className="text-white text-sm lg:text-base text-center banner-content">
                If your order is below $100 your shipping fee is $15 flat if
                within British Columbia.
              </p>
              <Link href="#banners" className="banner-content text-center">
                <Button
                  variant="outlined"
                  className="text-white normal-case bg-black border-white hover:text-black hover:bg-white w-36 lg:w-44 rounded-full banner-content"
                >
                  See More
                </Button>
              </Link>
            </TextReveal>
          </div>
        </Transition>
      </div>
      <div
        id="banners"
        className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-y-3  lg:px-20"
      >
        <div className="flex flex-col space-y-5">
          <Banner
            image="/images/banner/banner1.webp"
            link="/shop?vendors=MR%2520FOG"
            title={"New Mr.Fog"}
          />
          <Banner image="/images/banner/banner2.webp" link="#" />
        </div>
        <Banner
          className="col-span-2"
          height={isMobile ? "64" : "full"}
          image="/images/banner/banner3.webp"
          link="#"
          title="Disposable"
        />
        <div className="flex flex-col space-y-5">
          <Banner
            image="/images/banner/banner4.webp"
            link="#"
            title="New Arrival"
          />
          <Banner
            image="/images/banner/banner5.webp"
            link="#"
            title="Starter Kit"
          />
        </div>
      </div>

      {/* <CollectionSlider /> */}
      <Slider data={data[0]} />
      <Slider data={data[1]} />

      <div className="px-5 lg:px-20 mt-20">
        <p className="text-2xl font-medium hover:opacity-80">
          Featured Products Gallery
        </p>
        <AnimatedGallery data={data[2]?.data?.data.products.edges} />
      </div>

      <div className="px-5 lg:px-10 2xl:px-20 mt-16 flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center space-y-8 lg:w-1/2">
          <p className="text-center text-3xl font-medium">
            Canada's Premier Online Vape Shop
          </p>
          <p className="text-center">
            At Gas City Vapes, we have everything you need to start your vaping
            journey or to enhance your vaping experience. We know there are lots
            of options out there that can make it overwhelming, which is why our
            team is dedicated to helping you find the right products for your
            needs, lifestyle and budget.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 w-full gap-10">
          <div className="flex flex-col space-y-3 lg:w-10/12">
            <p className="text-xl text-center font-medium">
              We Guarantee Authenticity and Freshness
            </p>
            <p className="text-center">
              As Canada’s leading online vape shop, we offer all the latest
              products and top brands that are renowned for their quality and
              consistency. Whether you’re searching for electronic cigarettes,
              new vape juice flavours or cool accessories, you’ll find it right
              here in one convenient spot.
            </p>
          </div>
          <div className="flex flex-col space-y-3 lg:w-10/12">
            <p className="text-xl font-medium text-center">
              Find All the Latest Products
            </p>
            <p className="text-center">
              As a specialty vape shop, we meticulously curate our selections to
              provide our customers with the best gear and brands available. All
              of our inventory is properly stored in temperature-controlled
              facilities to ensure they remain fresh and ready for you to enjoy.
              To solidify our commitment to this, we guarantee the authenticity
              and freshness of each product so that our customers will never
              have to worry about receiving something subpar when placing an
              order. If you are ever unsatisfied with your order, we’ll provide
              you with a full refund. It’s as simple as that.
            </p>
          </div>
          <div className="flex flex-col space-y-3 lg:w-10/12">
            <p className="text-xl font-medium text-center">
              We Care About Our Customers
            </p>
            <p className="text-center">
              We’re here to help make your vaping experience as pleasant and
              hassle-free as possible. All of our expert staff are highly
              knowledgeable, friendly, and ready to answer any questions that
              you have. If you’re unsure about where to start and what you need
              as a new vaper, don’t hesitate to reach out to us. We will always
              take the time to explain different products, offer suggestions
              that work with your budget or recommend flavours that will tingle
              your taste buds.
            </p>
          </div>
          <div className="flex flex-col space-y-3 lg:w-10/12">
            <p className="text-xl font-medium text-center">
              Free Shipping When You Spend $50 or More
            </p>
            <p className="text-center">
              When you place an order that’s $50 or more before taxes, you’ll
              get free expedited shipping across Canada. For orders outside of
              Canada, please refer to our Shipping Policy and Rates. When you’re
              looking for the best selection of vape juice in Canada or need new
              vaping equipment to elevate your experience, Gas City Vapes has
              you covered. Order with confidence and get the quality products
              and services that you can count on.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 lg:mt-20 px-5 lg:px-10 2xl:px-20 flex flex-col space-y-5">
        <p className="text-xl lg:text-2xl font-medium">Join Us</p>

        <div className="relative w-full h-80 lg:hidden">
          <Image
            className="z-30 grayscale"
            src="/images/home/join-us.jpg"
            layout="fill"
          />
          <div className="z-50 absolute top-10 left-5 w-11/12 flex flex-col space-y-5">
            <p className="text-2xl text-white">MEMBER BENEFITS</p>
            <p className="text-white">
              Sign Up now to enjoy our benefits and exclusive offers
            </p>
          </div>
          <div className="absolute bottom-5 left-5 z-50">
            <Button className=" text-black bg-white px-8 rounded-full normal-case border-black shadow-lg">
              Sign Up
            </Button>
          </div>
        </div>

        <div className="hidden lg:block lg:px-10 2xl:px-20">
          <div className="grid grid-cols-2 w-full h-72">
            <div className="flex flex-col bg-slate-100 space-y-5 px-10 py-10">
              <p className="text-4xl">MEMBER BENEFITS</p>
              <p>Sign up now to enjoy our benefits and exclusive offers.</p>
              <div className="pt-10">
                <Button className="text-white text-lg bg-black px-10 rounded-full normal-case border-black shadow-xl hover:bg-white hover:text-black hover:border-black">
                  Sign Up
                </Button>
              </div>
            </div>
            <div className="relative w-full h-full grayscale contrast-50">
              <Image src="/images/home/join-us.jpg" layout="fill" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
