import React, { useContext, useEffect } from "react";
import cartContext from "../../utils/cartContext";
import Image from "../common/Image";
import Divider from "@mui/material/Divider";

import { cartRemoveItem, cartAdd } from "../../utils/utils";
// import useCheckoutUpdateLinesMutation from "../../utils/hooks/useCheckoutUpdateLinesMutation";

export default function DrawerList({ e }) {
  const { setCart } = useContext(cartContext);

  // let checkoutUpdate = useCheckoutUpdateLinesMutation()
  return (
    <>
      <div className="mt-4 mb-2 flex flex-row space-x-5 justify-between items-center">
        <div className="relative w-10 md:h-16 h-10 md:w-16 xl:w-32">
          <Image layout="fill" src={e.image} alt={e.title} />
        </div>
        <div className="w-3/4 flex flex-col space-x-2 md:space-y-4">
          <div className="flex flex-row justify-between space-x-5">
            <p className="font-medium text-sm">
              {e.title} {e.variantTitle ? `(${e.variantTitle})` : ""}
            </p>
            <p
              className="font-medium cursor-pointer"
              onClick={() =>
                cartRemoveItem({ merchandiseId: e.merchandiseId }, setCart)
              }
            >
              x
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row space-x-5">
              <button
                onClick={() => {
                  e.quantity = -1;
                  cartAdd(e, setCart);
                }}
              >
                -
              </button>
              <p>{e.quantity}</p>
              <button
                onClick={() => {
                  e.quantity = 1;
                  cartAdd(e, setCart);
                }}
              >
                +
              </button>
            </div>
            <p>${(e.price * e.quantity).toFixed(2)}</p>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
}
