import { useState, useEffect, useContext } from "react";
import deviceContext from "../utils/deviceContext";
// Hooks
import { useRouter } from "next/router";
import {
  vendorsGet,
  productTypeGet,
  collectionGet,
  productsGet,
} from "../lib/serverRequest";
import dynamic from "next/dynamic";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";

// Components
import Breadcrumbs from "../components/common/Breadcrumbs";
import SingeProduct from "../components/Shop/single-product";
import Pagination from "../components/Shop/pagination";
import { NextSeo } from "next-seo";
import FilterDrawer from "../components/Shop/filterDrawer";

const FilterBar = dynamic(() => import("../components/Shop/filterBar"));
const FilterMenu = dynamic(() => import("../components/Shop/filterMenu"));

export default function Shop() {
  const { isMobile } = useContext(deviceContext);
  const [dataArr, setDataArr] = useState([]);
  const [count, setCount] = useState(0);
  const [isNext, setNext] = useState(false);
  const [isPrevious, setPrevious] = useState(false);
  // State for query
  const [sortKey, setSortKey] = useState();
  const [isReverse, setReverse] = useState(false);
  const [cursorNext, setCursorNext] = useState();
  const [cursorLast, setCursorLast] = useState();
  const router = useRouter();
  const routerQuery = router.query;
  const { data } = useQuery(
    [
      "product",
      { index: routerQuery.index ? routerQuery.index : null },
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
        index: routerQuery.index,
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

  useEffect(() => {
    if (data) {
      setDataArr(data.data.products.edges);
      setNext(data.data.products.pageInfo.hasNextPage);
      setPrevious(data.data.products.pageInfo.hasPreviousPage);
      setCursorNext(data.data.products.edges[0].cursor);
      setCursorLast(
        data.data.products.edges[data.data.products.edges.length - 1].cursor
      );
    }
  }, [routerQuery]);

  return (
    <>
      <NextSeo title="Shop" description="" />
      <div className="flex flex-row items-center justify-between">
        <Breadcrumbs
          path={[
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
          ]}
        />
        {isMobile ? <FilterDrawer /> : <></>}
      </div>

      <div id="shop-container" className="px-3 md:px-10">
        {!isMobile ? (
          <FilterBar
            count={count}
            length={dataArr.length}
            setSortKey={setSortKey}
            setReverse={setReverse}
          />
        ) : (
          <></>
        )}

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
              {dataArr.map((e, i) => (
                <SingeProduct key={i} index={i} e={e} />
              ))}
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
    index,
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
      "product",
      { index: index === undefined ? null : index },
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
        index: index,
        limit: limit,
        reversed: reversed,
        sortKey: sort_key,
        cursor: cursor,
        direction: direction,
        price: price,
        instock: instock,
        vendors: vendors ? decodeURIComponent(vendors) : null,
        type: type ? decodeURIComponent(type) : null,
      }),
    { staleTime: 10000 }
  );
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
