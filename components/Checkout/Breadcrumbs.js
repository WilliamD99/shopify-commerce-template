import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "../common/Link";

export default function CheckoutBreadcrumbs({ step }) {
  return (
    <Breadcrumbs className="px-5 mb-5 mt-10 md:ml-10 md:mb-10">
      <Link className="text-black text-xl" href="/cart">
        Cart
      </Link>
      <Link
        className={`${step > 1 ? "text-black" : ""} text-xl`}
        href="/checkout/review"
      >
        Info
      </Link>
      <Link
        className={`${step > 2 ? "text-black" : ""} text-xl`}
        href="/checkout/payment"
      >
        Payment
      </Link>
      <p className={`${step > 3 ? "text-black" : ""} text-xl`}>Complete</p>
    </Breadcrumbs>
  );
}
