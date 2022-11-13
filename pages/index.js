import React, { useContext } from "react";
import deviceContext from "../utils/deviceContext";
import { useQueries } from "@tanstack/react-query";
import { productInCollection } from "../utils/api/requests";

import Image from "../components/common/Image";
import Banner from "../components/Home/Banner";
import Slider from "../components/Home/Slider";
import Button from "@mui/material/Button";

export default function Index() {
  const { isMobile } = useContext(deviceContext);
  const sliderData = useQueries({
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
    ],
  });

  return (
    <>
      <div
        id="banners"
        className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-3 lg:px-20"
      >
        <div className="flex flex-col space-y-5">
          <Banner image="/placeholder.webp" link="#" />
          <Banner image="/placeholder.webp" link="#" />
        </div>
        <Banner
          className="col-span-2"
          height={isMobile ? "64" : "full"}
          image="/placeholder.webp"
          link="#"
          title="Disposable3"
        />
        <div className="flex flex-col space-y-5">
          <Banner image="/placeholder.webp" link="#" title="Disposable4" />
          <Banner image="/placeholder.webp" link="#" title="Disposable5" />
        </div>
      </div>

      {/* <CollectionSlider /> */}
      <Slider data={sliderData[0]} title="Disposable" />
      <Slider data={sliderData[1]} title={sliderData[1]} />

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
