import React, { useContext, useEffect, useState } from "react";
import cartContext from "../../../utils/cartContext";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Single from "../single-product";

import { formatter } from "../../../utils/utils";

export default function ProductSummaryDesktop({ data }) {
  let displayCartTotal = () => {
    let total = 0;
    data.map((e) => (total += parseFloat(e.price) * e.quantity));
    return <p className="font-semibold text-lg">{formatter.format(total)}</p>;
  };

  if (!data) return <></>;

  return (
    <>
      <div>
        <p className="font-semibold text-2xl mb-10">Shopping Cart</p>
        {data.length > 0 ? (
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
              {data ? data.map((e, i) => <Single e={e} key={i} />) : <></>}
              <TableRow>
                <TableCell>
                  <p className="text-lg font-medium">Total</p>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>{data ? displayCartTotal() : <></>}</TableCell>
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
    </>
  );
}
