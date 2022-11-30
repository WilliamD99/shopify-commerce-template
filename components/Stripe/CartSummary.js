import React from "react";
import { formatter } from "../../utils/utils";
import Image from "../common/Image";
import Badge from "@mui/material/Badge";

export default function CartSummary({
  items,
  tax,
  total,
  subtotal,
  shippingCost,
}) {
  return (
    <>
      <div className="flex flex-col space-y-5 px-5">
        <div className="flex flex-col space-y-5 border-b-2 pb-5">
          {items.map((e, i) => (
            <div key={i} className="grid grid-cols-3 md:grid-cols-4">
              <Badge
                badgeContent={e.node.quantity}
                className="relative w-20 h-20"
                color="info"
              >
                <Image
                  src={e.node.variant.image.url}
                  layout="fill"
                  placeholder="blur"
                  blurDataURL="/placeholder.webp"
                  className="rounded-lg"
                />
              </Badge>
              <div className="flex flex-col space-y-2 justify-center md:col-span-2">
                <p className="text-xs md:text-sm">{e.node.title}</p>
                <p className="text-xs text-gray-400">{e.node.variant.title}</p>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-sm text-right">
                  {formatter.format(parseFloat(e.node.variant.price))}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col space-y-2 border-b-2 pb-5">
          <div className="grid grid-cols-2">
            <p className=" text-sm">Subtotal</p>
            <p className="text-right text-sm font-bold">
              {formatter.format(subtotal)}
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p className=" text-sm">Shipping Cost</p>
            <p className="text-right text-sm">
              {formatter.format(shippingCost)}
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p className=" text-sm">Tax</p>
            <p className="text-right text-sm">{formatter.format(tax)}</p>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <p className=" text-base">Total</p>
          <p className="text-right text-base font-bold">
            {formatter.format(total)}
          </p>
        </div>
      </div>
    </>
  );
}
