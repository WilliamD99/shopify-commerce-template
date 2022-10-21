import axios from "axios";
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import useProduct from "../utils/hooks/useGetAllProductsSf";

import useVendorGet from "../utils/hooks/useVendorGet";

export default function Test({ test }) {
  console.log(test);
  return <></>;
}

export async function getServerSideProps(context) {
  const test = context.req.headers.cookie;
  return {
    props: {
      test: test,
    },
  };
}
// "gid://shopify/Cart/e5522a205ac18c36bc776b9d2c447dd6"
// "gid://shopify/Cart/bf8969c8df0d88b1dd73f5b87cfee7bb"
