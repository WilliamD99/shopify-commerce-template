import React, { useContext } from "react";
import userContext from "../utils/userContext";
import { useRouter } from "next/router";

import Button from "@mui/material/Button";
import { NextSeo } from "next-seo";
import ProductSummary from "../components/Cart/product-summary";
import { checkoutPathGenerator } from "../utils/utils";

export default function Cart() {
  const { user } = useContext(userContext);
  const router = useRouter();

  return (
    <>
      <NextSeo title="Cart" description="" />
      <div className="flex justify-center mt-20">
        <div className="flex flex-col lg:w-8/12 lg:px-10">
          <ProductSummary />
        </div>
      </div>
      <div className="fixed bottom-0 flex lg:hidden justify-center bg-white z-50 py-5 w-screen">
        <Button
          variant="outlined"
          disabled={!user?.id ? true : false}
          className={`text-center w-11/12 h-12 rounded-full ${!user?.id ? "bg-gray-200" : "text-white bg-black border-black"
            }  normal-case text-lg`}
          onClick={async () => {
            let path = await checkoutPathGenerator()
            if (path) router.push(path)
          }}
        >
          Checkout
        </Button>
      </div>
    </>
  );
}
