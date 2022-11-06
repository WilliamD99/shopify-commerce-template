import React, { useContext } from "react";
import userContext from "../../../utils/userContext";

import Image from "../../common/Image";
import Link from "../../common/Link";
import Button from "@mui/material/Button";

import { formatter, cartAdd } from "../../../utils/utils";

export default function ProductSummaryDesktop({ data, setCart }) {
  const { user } = useContext(userContext);
  let displayCartTotal = () => {
    let total = 0;
    data.map((e) => (total += parseFloat(e.price) * e.quantity));
    return total;
  };
  if (!data) return <></>;
  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="rows-span-2 w-8/12 pr-10">
          <p className="text-2xl font-medium mb-10">Cart</p>
          <div className="flex flex-col space-y-5">
            {data.length > 0 ? (
              data.map((e, i) => (
                <div
                  className="flex flex-row justify-between first-of-type:border-t-2 border-b-2 py-4"
                  key={i}
                >
                  <div className="relative w-44 h-44">
                    <Image src={e.image} layout="fill" />
                  </div>
                  <div className="w-96 flex flex-col justify-between space-y-3">
                    <div className="flex flex-col space-y-2">
                      <Link className="text-xl font-semibold" href="#">
                        {e.title}
                      </Link>
                      {e.variantTitle === "" ? (
                        <></>
                      ) : (
                        <p className="text-lg italic text-gray-500">
                          {e.variantTitle}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-row items-center space-x-5">
                      <p className="text-lg">Quantity:</p>
                      <button
                        className="text-2xl"
                        onClick={() => {
                          e.quantity = -1;
                          cartAdd(e, setCart);
                        }}
                      >
                        -
                      </button>
                      <p className="text-xl">{e.quantity}</p>
                      <button
                        className="text-2xl"
                        onClick={() => {
                          e.quantity = 1;
                          cartAdd(e, setCart);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="text-lg">
                    {formatter.format(parseFloat(e.price) * e.quantity)}
                  </p>
                </div>
              ))
            ) : (
              <p>No product in cart yet</p>
            )}
          </div>
        </div>
        <div className="w-4/12">
          <p className="text-2xl font-medium mb-5">Summary</p>
          <div className="flex flex-col space-y-2 border-b-2 py-5">
            <div className="flex flex-row justify-between">
              <p className="text-lg font-medium">Subtotal</p>
              <p className="text-lg">{formatter.format(displayCartTotal())}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-lg font-medium">Delivery & Handling</p>
              <p className="text-lg italic">Calculate at checkout</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-lg font-medium">Taxes(Estimated)</p>
              <p className="text-lg">
                {formatter.format(displayCartTotal() * 0.05)}
              </p>
            </div>
          </div>
          <div className="py-5 flex flex-row justify-between border-b-2">
            <p className="text-lg font-medium">Total</p>
            <p className="text-lg font-medium">
              {formatter.format(displayCartTotal() * 1.05)}
            </p>
          </div>
          <div className="py-5">
            <Button
              variant="outlined"
              disabled={user.state !== "success" ? true : false}
              className={`w-full rounded-full h-12 ${
                user.state === "success"
                  ? "text-white bg-black border-black"
                  : "bg-gray-200"
              } hover:bg-white hover:text-black hover:border-black`}
            >
              Checkout
            </Button>
          </div>
          {user.state !== "success" ? (
            <div className="py-5 border-t-2">
              <p className="text-center">
                You need to sign in in order to checkout
              </p>
              <div className="flex flex-row justify-center space-x-2">
                <Link className="font-medium underline" href="#">
                  Join us
                </Link>{" "}
                <span>or</span>
                <Link className="font-medium underline" href="#">
                  Sign in
                </Link>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
