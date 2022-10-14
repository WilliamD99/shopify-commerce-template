import React, { useContext } from "react";
import cartContext from "../../utils/cartContext";
import { cartAdd, cartRemoveItem } from "../../utils/utils";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Image from "../common/Image";

export default function Single({ e }) {
  const { setCart } = useContext(cartContext);
  return (
    <>
      <TableRow>
        <TableCell className="w-1/2">
          <div className="flex flex-row space-x-5 items-center">
            <div className="relative h-20 w-20">
              <Image alt={e.title} layout="fill" src={e.image} />
            </div>
            <p>
              {e.title}
              {e.variantTitle !== "Default Title" ? (
                <span className="ml-1 font-semibold">({e.variantTitle})</span>
              ) : (
                <></>
              )}
            </p>
          </div>
        </TableCell>
        <TableCell>${e.price}</TableCell>
        <TableCell>
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
        </TableCell>
        <TableCell>${(e.price * e.quantity).toFixed(2)}</TableCell>
      </TableRow>
    </>
  );
}
