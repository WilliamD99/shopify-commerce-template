import React from "react";
import { formatter } from "../../utils/utils";
import Link from "../common/Link";
import { useRouter } from "next/router";

export default function ContactSummary({ email, address, shipping }) {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col w-full px-3 py-2 border-2 rounded-lg">
        <div className="grid grid-cols-5 py-2 border-b-2">
          <p className="text-gray-500 text-sm">Contact</p>
          <p className="col-span-3 text-sm">{email}</p>
          <Link
            className="text-right text-xs cursor-pointer text-blue-400 hver:opacity-70"
            href={`/checkout/${encodeURIComponent(router.query.index)}`}
          >
            Change
          </Link>
        </div>
        <div className="grid grid-cols-5 py-2 border-b-2">
          <p className="text-gray-500 text-sm">Address</p>
          <p className="col-span-3 text-sm">
            {`${address.address1} ${
              address.address2 ? `, ${address.address2}` : ""
            } ${address.city ? `, ${address.city}` : ""} ${
              address.province ? `,${address.province}` : ""
            } ${address.zip ? `,${address.zip}` : ""}`}
          </p>
          <p className="text-right text-xs cursor-pointer text-blue-400 hver:opacity-70">
            Change
          </p>
        </div>
        <div className="grid grid-cols-5 pt-2 ">
          <p className="text-gray-500 text-sm">Method</p>
          <p className="col-span-3 text-sm">
            {`${shipping.title} - ${formatter.format(
              parseFloat(shipping.priceV2.amount)
            )}`}
          </p>
          <p className="text-right text-xs cursor-pointer text-blue-400 hver:opacity-70">
            Change
          </p>
        </div>
      </div>
    </>
  );
}
