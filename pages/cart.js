import React, { useEffect, useState, useContext } from "react";
import useCartCreate from "../utils/hooks/useCartCreate";
import cartContext from "../utils/cartContext";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Single from "../components/Cart/single-product";
import Link from "../components/common/Link";
import { formatter } from "../utils/utils";

export default function Cart() {
  const [cartData, setCartData] = useState();
  const { cart } = useContext(cartContext);

  let displayCartTotal = () => {
    let total = 0;
    cartData.map((e) => (total += parseFloat(e.price) * e.quantity));
    return <p className="font-semibold text-lg">{formatter.format(total)}</p>;
  };

  // Generate cart id in the local storage
  useCartCreate();

  // For live data update
  useEffect(() => {
    setCartData(JSON.parse(localStorage.getItem("items")));
  }, [cart]);

  // if (!cartData) return <p>Loading...</p>
  console.log(cartData);
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-1/2 px-10">
        <div>
          <p className="font-semibold text-2xl">Shopping Cart</p>
          {cart.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="text-lg font-medium">Product</TableCell>
                  <TableCell className="text-lg font-medium">Price</TableCell>
                  <TableCell className="text-lg font-medium">
                    Quantity
                  </TableCell>
                  <TableCell className="text-lg font-medium">
                    Subtotal
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartData ? (
                  cartData.map((e, i) => <Single e={e} key={i} />)
                ) : (
                  <></>
                )}
                <TableRow>
                  <TableCell>
                    <p className="text-lg font-medium">Total</p>
                  </TableCell>
                  <TableCell>{/* <p>Test</p> */}</TableCell>
                  <TableCell>{/* <p>Test</p> */}</TableCell>
                  <TableCell>{cartData ? displayCartTotal() : <></>}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <div className="py-5">
              <p className="text-lg">
                No products in cart yet, please comeback later.
              </p>
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col space-y-2 items-end px-10">
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
  );
}
