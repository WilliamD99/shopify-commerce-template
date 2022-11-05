import React from "react";
import { formatter } from "../../../utils/utils";
import { cartAdd, cartRemoveItem } from "../../../utils/utils";

import Link from "../../common/Link";
import Image from "../../common/Image";

export default function ProductSummaryMobile({ data, setCart }) {
  console.log(data);
  let displayCartTotal = () => {
    let total = 0;
    data.map((e) => (total += parseFloat(e.price) * e.quantity));
    return <p className="font-medium">{formatter.format(total)}</p>;
  };

  if (!data) return <></>;
  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-2 mb-12">
        <p className="text-xl font-bold">Cart</p>
        <div className="flex flex-row space-x-5 items-center">
          <p>{data.length} items</p>
          <span>|</span>
          {displayCartTotal()}
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
    </>
  );
}
