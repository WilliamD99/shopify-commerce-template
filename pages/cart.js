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

export default function Cart() {
  const [cartData, setCartData] = useState();
  const { cart } = useContext(cartContext);

  // Generate cart id in the local storage
  useCartCreate();

  // For live data update
  useEffect(() => {
    setCartData(JSON.parse(localStorage.getItem("items")));
  }, [cart]);

  // if (!cartData) return <p>Loading...</p>

  return (
    <div className="flex flex-col px-10">
      <div>
        <p className="font-semibold text-2xl">Shopping Cart</p>
        {cart.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="text-lg font-medium">Product</TableCell>
                <TableCell className="text-lg font-medium">Price</TableCell>
                <TableCell className="text-lg font-medium">Quantity</TableCell>
                <TableCell className="text-lg font-medium">Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartData ? (
                cartData.map((e, i) => <Single e={e} key={i} />)
              ) : (
                <></>
              )}
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

      <div className="mt-10">
        <Button
          disabled={cart.length > 0 ? false : true}
          variant="outlined"
          className="px-20 rounded-lg"
        >
          <Link href="/checkout/review">Checkout</Link>
        </Button>
      </div>
    </div>
  );
}
