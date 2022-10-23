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
// import redisClient from "../lib/redis";
import { storefrontHeaders, storefrontURL } from "../utils/api/header";
import { decodeOptions } from "../utils/utils";

export default function Test({ data }) {
  console.log(data);
  return <></>;
}

// export async function getStaticProps({ params }) {
//   const options = decodeOptions(params.path);
//   return {
//     props: {
//       options,
//     },
//   };
// }

// export function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: true,
//   };
// }

// "gid://shopify/Cart/e5522a205ac18c36bc776b9d2c447dd6"
// "gid://shopify/Cart/bf8969c8df0d88b1dd73f5b87cfee7bb"
