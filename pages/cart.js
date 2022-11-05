import React, { useEffect, useState, useContext } from "react";
import useCartCreate from "../utils/hooks/useCartCreate";
import cartContext from "../utils/cartContext";
import deviceContext from "../utils/deviceContext";
import userContext from "../utils/userContext";
import { Router, useRouter } from "next/router";

import Button from "@mui/material/Button";
import Link from "../components/common/Link";
import { NextSeo } from "next-seo";
import ProductSummary from "../components/Cart/product-summary";

export default function Cart() {
  const { cart } = useContext(cartContext);
  const { user } = useContext(userContext);
  const router = useRouter();
  console.log(user);

  return (
    <>
      <NextSeo title="Cart" description="" />
      <div className="flex justify-center mt-20">
        <div className="flex flex-col lg:w-1/2 lg:px-10">
          <ProductSummary />
          <div className="mt-10 hidden lg:flex flex-col space-y-2 items-end lg:px-10">
            <div className="max-w-max">
              <p className="text-sm italic">
                Shipping, taxes, and discounts will be calculated at checkout.
              </p>
            </div>
            <div className="flex justify-end">
              <Button
                disabled={cart.length > 0 ? false : true}
                variant="outlined"
                className="px-20 rounded-lg text-white bg-black hover:text-black hover:bg-white hover:border-black"
              >
                <Link className="w-full" href="/checkout/review">
                  Checkout
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 flex lg:hidden justify-center bg-white z-50 py-5 w-screen">
        <Button
          variant="outlined"
          disabled={user.state === "none" ? true : false}
          className={`text-center w-11/12 h-12 rounded-full ${
            user.state === "none"
              ? "bg-gray-200"
              : "text-white bg-black border-black"
          }  normal-case text-lg`}
          onClick={() => {
            router.push("/checkout/review");
          }}
        >
          Checkout
        </Button>
      </div>
    </>
  );
}
