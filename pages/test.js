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
import { SideBySideMagnifier } from "react-image-magnifiers";
import useProductGetReviews from "../utils/hooks/useProductGetReviews";

export default function Test() {
  let test = useProductGetReviews();

  useEffect(() => {
    axios
      .post("/api/reviews/post_product_reviews", {
        data: {
          id: "7278769995956",
          productTitle: "7 Shakra Bracelet",
          name: "Will Dzoan",
          email: "will.doan@advesa.com",
          content: "This is the best",
          title: "Product Reviews",
          score: 4,
        },
      })
      .then((res) => console.log(res));
  }, []);

  // useEffect(() => {
  //   test.mutate({ id: "7278769995956" });
  // }, []);

  // useEffect(() => {
  //   if (test.data) console.log(test.data);
  // }, [test.data]);

  return <></>;
}
