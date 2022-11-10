import React, { useEffect, useState, useContext } from "react";
import deviceContext from "../../utils/deviceContext";
import dynamic from "next/dynamic";
import useProductByCollection from "../../utils/hooks/useProductByCollection";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {
  collectionGet,
  vendorsGet,
  productTypeGet,
  productInCollection,
} from "../../lib/serverRequest";

import SingleProduct from "../../components/Shop/single-product";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Loading from "../../components/Loading/dataLoading";

const FilterMenu = dynamic(() => import("../../components/Shop/filterMenu"));
const FilterBar = dynamic(() => import("../../components/Shop/filterBar"));
const FilterDrawer = dynamic(() =>
  import("../../components/Shop/filterDrawer")
);
import Pagination from "../../components/Shop/pagination";
import { NextSeo } from "next-seo";

export default function Collection({ col }) {
  const router = useRouter();
  let routerQuery = router.query;
  const { data } = useQuery(
    [
      `collection-${col}`,
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
      productInCollection({
        handle: col,
        limit: routerQuery.limit,
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
    { staleTime: 10000 }
  );

  const { isMobile } = useContext(deviceContext);
  const products = useProductByCollection();
  const [dataArr, setDataArr] = useState([]);
  const [isNext, setNext] = useState(false);
  const [isPrevious, setPrevious] = useState(false);

  // State for query
  const [sortKey, setSortKey] = useState();
  const [isReverse, setReverse] = useState(false);
  const [cursorNext, setCursorNext] = useState();
  const [cursorLast, setCursorLast] = useState();
  const [direction, setDirection] = useState(true);
  console.log(data)
  useEffect(() => {
    setDataArr(data?.data.collection.products.edges);
    setNext(data ? data.data.collection.products.pageInfo.hasNextPage : false);
    setPrevious(
      data ? data.data.collection.products.pageInfo.hasPreviousPage : false
    );
    setCursorLast(
      data?.data.collection.products.edges[
        data.data.collection.products.edges.length - 1
      ]?.cursor
    );
    setCursorNext(data?.data.collection.products.edges[0]?.cursor);
  }, [routerQuery]);

  return (
    <>
      <NextSeo title="Shop" description="" />
      <div className="flex flex-row items-center justify-between">
        <Breadcrumbs
          path={[
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            {
              name: `${data ? data.data.collection.title : ""}`,
              path: "#",
            },
          ]}
        />
        {isMobile ? <FilterDrawer /> : <></>}
      </div>

      <div id="shop-container" className="px-10">
        {!isMobile ? <FilterBar /> : <></>}
        <div className="flex flex-row justify-center xl:justify-between mt-5 md:space-x-8 z-50">
          {!isMobile ? <FilterMenu /> : <></>}

          <div className="relative w-11/12 md:w-full xl:w-10/12">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 gap-y-10">
              {
                data.data.collection.products.edges.length > 0 ?
                  dataArr.map((e, i) => (
                    <SingleProduct index={i} e={e} key={e.node.title} />
                  ))
                  :
                  <p>No product found</p>
              }
            </div>
            {products.isLoading ? (
              <></>
            ) : (
              <Pagination
                isPrevious={isPrevious}
                isNext={isNext}
                setDirection={setDirection}
                cursorFirst={cursorNext}
                cursorLast={cursorLast}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const queryClient = new QueryClient();
export async function getServerSideProps({ query, res }) {
  let {
    ["products-in-collection"]: col,
    limit,
    reversed,
    sort_key,
    cursor,
    direction,
    price,
    instock,
    vendors,
    type,
  } = query;
  col = decodeURIComponent(col);

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
      `collection-${col}`,
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
      productInCollection({
        handle: col,
        limit,
        reversed,
        sort_key,
        cursor,
        direction,
        price,
        instock,
        vendors,
        type,
      }),
    {
      staleTime: 10000,
    }
  );

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=59"
  );

  return {
    props: {
      col: col,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
