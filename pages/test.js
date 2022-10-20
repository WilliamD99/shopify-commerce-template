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
import useProduct from "../utils/hooks/useGetAllProductsSf";

import Reviews from "../components/ProductDetails/reviews";
import useCustomerCreate from "../utils/hooks/useCustomerCreate";
import { decryptText, gsap } from "../utils/utils";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";
import useSWR from "swr";

import useVendorGet from "../utils/hooks/useVendorGet";

export default function Test() {
  let vendorsGet = useVendorGet();
  let product = useProduct();

  useEffect(() => {
    if (product.data) console.log(product.data);
  }, [product.isLoading]);

  useEffect(() => {
    vendorsGet.mutate();
    product.mutate({});
  }, []);

  useEffect(() => {
    if (vendorsGet.data) {
      console.log(vendorsGet.data);
    }
  }, [vendorsGet.data]);

  return <></>;
}
// "gid://shopify/Cart/e5522a205ac18c36bc776b9d2c447dd6"
// "gid://shopify/Cart/bf8969c8df0d88b1dd73f5b87cfee7bb"
