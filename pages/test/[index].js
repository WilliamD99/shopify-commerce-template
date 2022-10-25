import React from "react";
import Link from "../../components/common/Link";
import axios from "axios";
import { storefrontURL, storefrontHeaders } from "../../utils/api/header";
import { productsGet } from "../../lib/serverRequest";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function Test() {
  const router = useRouter();
  const routerQuery = router.query;
  const { data, isLoading, isFetching, isStale, isSuccess } = useQuery(
    ["product-all"],
    () =>
      productsGet({
        index: routerQuery.index,
        limit: routerQuery.limit,
        reversed: routerQuery.reversed,
        sortKey: routerQuery.sortKey,
        cursor: routerQuery.cursor,
        direction: routerQuery.direction,
        price: routerQuery.price,
        instock: routerQuery.instock,
        vendors: routerQuery.vendors,
        type: routerQuery.type,
      })
  );
  console.log(data.data.products.edges);

  return (
    <>
      {/* <div>{data.data.data.productByHandle.title}</div> */}
      {isFetching ? <p>Loading</p> : <></>}
      <Link href="/test/default-product?type=vape">Testst</Link>
      <Link href="/test/test-product">Test2</Link>
    </>
  );
}

export async function getServerSideProps({ query, res }) {
  const {
    index,
    limit,
    reversed,
    sortKey,
    cursor,
    direction,
    price,
    instock,
    vendors,
    type,
  } = query;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["product-all"], () =>
    productsGet({
      index: index,
      limit: limit,
      reversed: reversed,
      sortKey: sortKey,
      cursor: cursor,
      direction: direction,
      price: price,
      instock: instock,
      vendors: vendors,
      type: type,
    })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
