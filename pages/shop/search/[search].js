import React, { useEffect, useState, useContext } from "react";
import deviceContext from "../../../utils/deviceContext";

// Hooks
import { useRouter } from "next/router";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";

// Components
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import FilterMenu from "../../../components/Shop/filterMenu";
import FilterBar from "../../../components/Shop/filterBar";
import Pagination from "../../../components/Shop/pagination";
import {
  productsGet,
  vendorsGet,
  productTypeGet,
  collectionGet,
} from "../../../lib/serverRequest";

import SingleProduct from "../../../components/Shop/single-product";

export default function Search() {
  const { isMobile } = useContext(deviceContext);
  let router = useRouter();
  let routerQuery = router.query;
  const [isNext, setNext] = useState(false);
  const [isPrevious, setPrevious] = useState(false);
  const [dataArr, setDataArr] = useState([]);
  const [cursorNext, setCursorNext] = useState();
  const [cursorLast, setCursorLast] = useState();

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

  useEffect(() => {
    if (data) {
      setDataArr(data.data.products.edges);
      setNext(data.data.products.pageInfo.hasNextPage);
      setPrevious(data.data.products.pageInfo.hasPreviousPage);
      setCursorNext(data.data.products.edges[0]?.cursor);
      setCursorLast(
        data.data.products.edges[data.data.products.edges.length - 1]?.cursor
      );
    }
  }, [routerQuery]);

  return (
    <>
      <Breadcrumbs
        path={[
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          { name: `Search: "${routerQuery.search}"`, path: "#" },
        ]}
      />

      <div id="shop-container" className="px-3 md:px-10">
        {!isMobile ? <FilterBar /> : <></>}

        <div
          id="shop"
          className="flex flex-row justify-center xl:justify-between mt-5 md:space-x-8 z-50"
        >
          {!isMobile ? <FilterMenu /> : <></>}

          <div className="relative w-11/12 md:w-full xl:w-10/12">
            <div
              id="shop-grid"
              className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 gap-y-10"
            >
              {dataArr.length > 0 ? (
                dataArr.map((e, i) => <SingleProduct key={i} index={i} e={e} />)
              ) : (
                <p className="font-semibold">No product found</p>
              )}
            </div>

            <Pagination
              isPrevious={isPrevious}
              isNext={isNext}
              cursorFirst={cursorNext}
              cursorLast={cursorLast}
            />
          </div>
        </div>
      </div>
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
    search,
  } = query;

  await queryClient.prefetchQuery(["vendors-all"], vendorsGet, {
    staleTime: 24 * 60 * 60 * 1000,
  });
  await queryClient.prefetchQuery(["types-all"], productTypeGet, {
    staleTime: 24 * 60 * 60 * 1000,
  });
  await queryClient.prefetchQuery(["collections-all"], collectionGet, {
    staleTime: 24 * 60 * 60 * 1000,
  });

  await queryClient.prefetchQuery(
    [
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
    ],
    () =>
      productsGet({
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
      }),
    { staleTime: 10000 * 6 }
  );

  // res.setHeader(
  //   "Cache-Control",
  //   "public, s-maxage=30, stale-while-revalidate=59"
  // );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
