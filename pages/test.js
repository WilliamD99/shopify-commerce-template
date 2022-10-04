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
          productTitle: "Test Product",
          name: "Bruce Denzel",
          email: "bruceisgay@gmail.com",
          content: "I'm in love with this product",
          title: "So Good",
          score: 4.5,
        },
      })
      .then((res) => console.log(res));
  }, []);

  // useEffect(() => {
  //   axios
  //     .post("/api/reviews/get_product_bottom", {
  //       data: {
  //         id: "7255529717940",
  //       },
  //     })
  //     .then((res) => console.log(res));
  // }, []);

  // useEffect(() => {
  //   test.mutate({ id: "7255529717940" });
  // }, []);

  // useEffect(() => {
  //   if (test.data) console.log(test.data);
  // }, [test.data]);

  return <></>;
}
