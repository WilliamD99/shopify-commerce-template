import React, { useEffect, useState, useContext } from "react";
import deviceContext from "../../utils/deviceContext";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import useProductByCollection from "../../utils/hooks/useProductByCollection";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";
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
  console.log(col);
  const { isMobile } = useContext(deviceContext);
  const router = useRouter();
  const routerQuery = router.query;
  const products = useProductByCollection();
  const [dataArr, setDataArr] = useState([]);
  const [isNext, setNext] = useState(false);
  const [isPrevious, setPrevious] = useState(false);

  const { data } = useQuery(
    [`collection-${col}`],
    () =>
      productInCollection({
        id: col,
      }),
    { staleTime: 10000 }
  );
  console.log(data);

  // State for query
  const [sortKey, setSortKey] = useState();
  const [isReverse, setReverse] = useState(false);
  const [cursorNext, setCursorNext] = useState();
  const [cursorLast, setCursorLast] = useState();
  const [direction, setDirection] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      if (routerQuery.col) {
        products.mutate({
          id: decodeURIComponent(routerQuery.col),
          sortKey: routerQuery.sort_key,
          reverse: routerQuery.reverse,
          price: routerQuery.price,
          instock: routerQuery.instock,
          direction: direction,
          cursor: routerQuery.cursor,
          vendors: routerQuery.vendors
            ? decodeURIComponent(routerQuery.vendors)
            : "",
          type: routerQuery.type ? routerQuery.type : "",
          limit: routerQuery.limit,
        });
      }
    }
  }, [routerQuery]);

  useEffect(() => {
    setDataArr([]);
    if (products.data && products.data.collection.products.edges.length > 0) {
      setDataArr(products.data.collection.products.edges);
      setNext(products.data.collection.products.pageInfo.hasNextPage);
      setPrevious(products.data.collection.products.pageInfo.hasPreviousPage);

      setCursorLast(
        products.data.collection.products.edges[
          products.data.collection.products.edges.length - 1
        ].cursor
      );
      setCursorNext(products.data.collection.products.edges[0].cursor);
    }
  }, [products.isLoading]);

  return (
    <>
      <NextSeo title="Shop" description="" />
      <div className="flex flex-row items-center justify-between">
        <Breadcrumbs
          path={[
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            {
              name: `${products.data ? products.data.collection.title : ""}`,
              path: "#",
            },
          ]}
        />
        {isMobile ? <FilterDrawer /> : <></>}
      </div>

      <div id="shop-container">
        {!isMobile ? <FilterBar /> : <></>}
        <div className="flex flex-row justify-center xl:justify-between mt-5 md:space-x-8 z-50">
          {!isMobile ? <FilterMenu /> : <></>}

          <div className="relative w-11/12 md:w-full xl:w-10/12">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 gap-y-10">
              {products.isLoading ? (
                <Loading />
              ) : (
                dataArr.map((e, i) => (
                  <SingleProduct index={i} e={e} key={e.node.title} />
                ))
              )}
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
  let { col } = query;
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
    [`collection-${col}`],
    () =>
      productInCollection({
        id: col,
      }),
    {
      staleTime: 10000,
    }
  );

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {
      col: col,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
