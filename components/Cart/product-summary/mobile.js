import React, { useContext } from "react";
import userContext from "../../../utils/userContext";
import { formatter } from "../../../utils/utils";
import { cartAdd } from "../../../utils/utils";

import Link from "../../common/Link";
import Image from "../../common/Image";

export default function ProductSummaryMobile({ data, setCart }) {
  const { user } = useContext(userContext);
  let displayCartTotal = () => {
    let total = 0;
    data.map((e) => (total += parseFloat(e.price) * e.quantity));
    return total;
  };
  let displayTotalItem = () => {
    let total = 0;
    data.map((e) => (total += e.quantity));
    return total;
  };

  if (!data) return <></>;
  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-2 mb-12">
        <p className="text-2xl font-bold">Cart</p>
        <div className="flex flex-row space-x-5 items-center">
          <p>{displayTotalItem()} items</p>
          <span>|</span>
          <p className="font-semibold">
            {formatter.format(displayCartTotal())}
          </p>
        </div>
      </div>
      <div>
        {data.length > 0 ? (
          data.map((e, i) => (
            <div
              key={i}
              className="flex flex-row space-x-3 border-t-2 last-of-type:border-b-2 py-5 justify-between"
            >
              <div className="relative h-20 w-20">
                <Image src={e.image} layout="fill" />
              </div>
              <div className="w-44">
                <Link href={"#"} className="font-semibold">
                  {e.title}
                </Link>
                {e.variantTitle === "" ? (
                  <></>
                ) : (
                  <p className="text-sm italic ml-2">{e.variantTitle}</p>
                )}
                <div className="flex flex-row items-center space-x-5">
                  <button
                    className="text-lg"
                    onClick={() => {
                      e.quantity = -1;
                      cartAdd(e, setCart);
                    }}
                  >
                    -
                  </button>
                  <p>{e.quantity}</p>
                  <button
                    className="text-lg"
                    onClick={() => {
                      e.quantity = 1;
                      cartAdd(e, setCart);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <p>{formatter.format(parseFloat(e.price) * e.quantity)}</p>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="mt-5">
        <p className="font-semibold text-lg">Summary</p>
        <div className="mt-4">
          <div className="grid grid-cols-2">
            <p className="text-sm">Subtotal</p>
            <p className="text-right text-sm">
              {formatter.format(displayCartTotal())}
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm">Delivery & Handling</p>
            <p className="text-right text-sm italic">
              Calculate during checkout
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm">Tax (Estimated)</p>
            <p className="text-right text-sm">
              {formatter.format(displayCartTotal() * 0.05)}
            </p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-sm">Total</p>
            <p className="text-right text-sm font-semibold">
              {formatter.format(displayCartTotal() * 0.05 + displayCartTotal())}
            </p>
          </div>
        </div>
      </div>
      {!user.id ? (
        <div className="mt-10">
          <p className="text-red-500 font-semibold text-center italic">
            You need to sign in in order to checkout
          </p>
          <div className="text-center mt-3">
            <Link className="underline font-medium" href="#">
              Join us
            </Link>{" "}
            or{" "}
            <Link className="underline font-medium" href="#">
              Sign in
            </Link>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
