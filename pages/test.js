import axios from "axios";
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import useCustomerGet from "../utils/hooks/useCustomerGet";
import useLoyaltyGetCustomer from "../utils/hooks/useLoyaltyCustomerGet";
import userContext from "../utils/userContext";
import useProductGetReviews from "../utils/hooks/useProductGetReviews";
import useProduct from "../utils/hooks/useGetAllProduct";

import Reviews from "../components/ProductDetails/reviews";

export default function Test() {
  // useEffect(() => {
  //   axios
  //     .post("/api/storefront/mutation/cart", {
  //       data: {
  //         lines: [
  //           {
  //             merchandiseId: "gid://shopify/ProductVariant/41925953585332",
  //             quantity: 200,
  //           },
  //         ],
  //       },
  //     })
  //     .then((res) => console.log(res));
  // }, []);

  useEffect(() => {
    axios
      .post("/api/storefront/query/cart-get", {
        data: {
          id: "gid://shopify/Cart/bbd87d24833c3fb50ee5eb5f11161624",
        },
      })
      .then((res) => console.log(res.data));
  }, []);

  return <></>;
}
// "gid://shopify/Cart/e5522a205ac18c36bc776b9d2c447dd6"
// "gid://shopify/Cart/bf8969c8df0d88b1dd73f5b87cfee7bb"
