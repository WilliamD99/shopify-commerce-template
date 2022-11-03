import React, { useEffect, useState } from "react";

// Hooks
import { useRouter } from "next/router";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";

// Components
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import FilterMenu from "../../../components/Shop/filterMenu";
import Filter from "../../../components/Shop/filterBar";
import Pagination from "../../../components/Shop/pagination";
import { productSearch, productsGet } from "../../../lib/serverRequest";

export default function Search() {
  let router = useRouter();
  let routerQuery = router.query;
  const [isNext, setNext] = useState(false);
  const [isPrevious, setPrevious] = useState(false);
  const [dataArr, setDataArr] = useState([]);
  const [cursorNext, setCursorNext] = useState();
  const [cursorLast, setCursorLast] = useState();
  const [direction, setDirection] = useState(true);
  const { data } = useQuery(
    [
      "search",
      routerQuery.search,
      { limit: routerQuery.limit ? routerQuery.limit : null },
      { reversed: routerQuery.reversed ? routerQuery.reversed : null },
      { sortKey: routerQuery.sort_key ? routerQuery.sort_key : null },
      { cursor: routerQuery.cursor ? routerQuery.cursor : null },
      { direction: routerQuery.direction ? routerQuery.direction : null },
      { price: routerQuery.price ? routerQuery.price : null },
      { instock: routerQuery.instock ? routerQuery.instock : null },
      {
        vendors: routerQuery.vendors
          ? decodeURIComponent(routerQuery.vendors)
          : null,
      },
      { type: routerQuery.type ? decodeURIComponent(routerQuery.type) : null },
    ],
    () =>
      productsGet({
        limit: routerQuery.limit,
        search: routerQuery.search,
        reversed: routerQuery.reversed,
        sortKey: routerQuery.sort_key,
        cursor: routerQuery.cursor,
        direction: routerQuery.direction,
        price: routerQuery.price,
        instock: routerQuery.instock,
        vendors: routerQuery.vendors
          ? decodeURIComponent(routerQuery.vendors)
          : null,
        type: routerQuery.type ? decodeURIComponent(routerQuery.type) : null,
      }),
    { staleTime: 10000 * 6 }
  );

  // useEffect(() => {
  //   if (routerQuery.search) {
  //     if (routerQuery.search !== "") {
  //       productSearch.mutate({
  //         search: routerQuery.search,
  //         sortKey: routerQuery.sort_key,
  //         reverse: routerQuery.reverse,
  //         price: routerQuery.price,
  //         sales: routerQuery.sales,
  //         direction: direction,
  //         cursor: routerQuery.cursor,
  //       });
  //     }
  //   }
  // }, [routerQuery]);

  // useEffect(() => {
  //   if (productSearch.data) {
  //     setDataArr(productSearch.data.products.edges);
  //     setNext(productSearch.data.products.pageInfo.hasNextPage);
  //     setPrevious(productSearch.data.products.pageInfo.hasPreviousPage);
  //     setCursorLast(
  //       productSearch.data.products.edges[
  //         productSearch.data.products.edges.length - 1
  //       ].cursor
  //     );
  //     setCursorNext(productSearch.data.products.edges[0].cursor);
  //   }
  // }, [productSearch.data]);

  return (
    <>
      <Breadcrumbs
        path={[
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          { name: `Search: "${routerQuery.search}"`, path: "#" },
        ]}
      />
      {/* <div>Search</div>
      {productSearch.isLoading ? (
        <></>
      ) : (
        <Pagination
          isPrevious={isPrevious}
          isNext={isNext}
          setDirection={setDirection}
          cursorFirst={cursorNext}
          cursorLast={cursorLast}
        />
      )} */}
    </>
  );
}

const queryClient = new QueryClient();
export async function getServerSideProps({ query, res }) {
  const {
    limit,
    reversed,
    sort_key,
    cursor,
    direction,
    price,
    instock,
    vendors,
    type,
    search
  } = query;

  await queryClient.prefetchQuery([
    "search",
    query.search,
    { limit: limit === undefined ? null : limit },
    { reversed: reversed === undefined ? null : reversed },
    { sortKey: sort_key === undefined ? null : sort_key },
    { cursor: cursor === undefined ? null : cursor },
    { direction: direction === undefined ? null : direction },
    { price: price === undefined ? null : price },
    { instock: instock === undefined ? null : instock },
    { vendors: vendors ? decodeURIComponent(vendors) : null },
    { type: type ? decodeURIComponent(type) : null },
  ], () => productSearch({
    limit: limit,
    search: search,
    reversed: reversed,
    sortKey: sort_key,
    cursor: cursor,
    direction: direction,
    price: price,
    instock: instock,
    vendors: vendors ? decodeURIComponent(vendors) : null,
    type: type ? decodeURIComponent(type) : null,
  }), { staleTime: 10000 * 6 })

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=59"
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}