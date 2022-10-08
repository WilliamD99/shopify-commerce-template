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
import useProduct from '../utils/hooks/useGetAllProduct'

import Reviews from "../components/ProductDetails/reviews";

export default function Test() {
  let test = useProductGetReviews();

  let product = useProduct()

  useEffect(() => {
    if (product.data) console.log(product.data)
  }, [product.data])

  return (
    <>
    </>
  );
}
