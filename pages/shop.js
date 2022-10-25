import { useState, useEffect, useContext } from "react";
import deviceContext from "../utils/deviceContext";
import loadingContext from "../utils/loadingContext";

// Hooks
import Router, { useRouter } from "next/router";
import { productAllStorefront } from "../utils/api/requests";
import { useMutation } from "@tanstack/react-query";
import {
  vendorsGet,
  productTypeGet,
  collectionGet,
  productsGet,
} from "../lib/serverRequest";
import dynamic from "next/dynamic";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";

// Components
// import Loading from "../components/Loading/dataLoading";
import Breadcrumbs from "../components/common/Breadcrumbs";
import SingeProduct from "../components/Shop/single-product";
// import FilterBar from "../components/Shop/filterBar";
// import FilterMenu from "../components/Shop/filterMenu";
import Pagination from "../components/Shop/pagination";
import { NextSeo } from "next-seo";
import FilterDrawer from "../components/Shop/filterDrawer";

const FilterBar = dynamic(() => import("../components/Shop/filterBar"));
const FilterMenu = dynamic(() => import("../components/Shop/filterMenu"));

export default function Shop({ vendors, types, collections }) {
  // const { loading } = useContext(loadingContext);
  const router = useRouter();
  const routerQuery = router.query;
  const { data } = useQuery(["product-all"], () =>
    productsGet({
      index: routerQuery.index,
      limit: routerQuery.limit,
      reversed: routerQuery.reversed,
      sortKey: routerQuery.sortKey,
      cursor: routerQuery.cursor,
      direction: routerQuery.direction,
      price: routerQuery.price,
      instock: routerQuery.instock,
      vendors: routerQuery.vendors
        ? decodeURIComponent(routerQuery.vendors)
        : undefined,
      type: routerQuery.type ? decodeURIComponent(routerQuery.type) : undefined,
    })
  );
  // console.log(isLoading, isStale, isSuccess, isInitialLoading, isFetching);
  const { isMobile } = useContext(deviceContext);
  const [dataArr, setDataArr] = useState([]);
  const [count, setCount] = useState(0);
  const [isNext, setNext] = useState(data.data.products.pageInfo.hasNextPage);
  const [isPrevious, setPrevious] = useState(
    data.data.products.pageInfo.hasPreviousPage
  );

  useEffect(() => {
    if (data) {
      setDataArr(data.data.products.edges);
    }
  }, [routerQuery]);

  // State for query
  const [sortKey, setSortKey] = useState();
  const [isReverse, setReverse] = useState(false);
  const [cursorNext, setCursorNext] = useState();
  const [cursorLast, setCursorLast] = useState();
  const [direction, setDirection] = useState(true);

  // useEffect(() => {
  //   setDataArr([]);
  //   if (router.isReady) {
  //     mutateProductNextSf.mutate({
  //       sortKey: routerQuery.sort_key,
  //       isReverse: routerQuery.reverse ? routerQuery.reverse.toString() : "",
  //       cursor: routerQuery.cursor,
  //       price: routerQuery.price,
  //       instock: routerQuery.instock,
  //       vendors: routerQuery.vendors
  //         ? decodeURIComponent(routerQuery.vendors)
  //         : "",
  //       type: routerQuery.type ? decodeURIComponent(routerQuery.type) : "",
  //       limit: routerQuery.limit,
  //     });
  //     // }
  //   }
  // }, [routerQuery]);

  // let mutateProductNextSf = useMutation(async (params) => {
  //   let data = await productAllStorefront({
  //     cursor: params.cursor,
  //     direction: direction,
  //     sortKey: params.sortKey ? params.sortKey : sortKey,
  //     reversed: params.isReverse ? params.isReverse : isReverse,
  //     price: params.price,
  //     instock: params.instock,
  //     vendors: params.vendors,
  //     type: params.type,
  //     limit: params.limit,
  //   });
  //   let edges = data.data.products.edges;
  //   setDataArr(edges);
  //   setNext(data.data.products.pageInfo.hasNextPage);
  //   setPrevious(data.data.products.pageInfo.hasPreviousPage);

  //   setCursorNext(edges[0].cursor);
  //   setCursorLast(edges[edges.length - 1].cursor);

  //   if (direction) setCount(edges.length + count);
  //   else setCount(count - edges.length);
  //   return data.data;
  // });

  return (
    <>
      <NextSeo title="Shop" description="" />
      {/* {loading ? <Loading /> : <></>} */}
      <div className="flex flex-row items-center justify-between">
        <Breadcrumbs
          path={[
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
          ]}
        />
        {isMobile ? (
          <FilterDrawer
            vendors={vendors.data.shop.productVendors.edges}
            types={types.data.productTypes.edges}
            collections={collections.data.collections.edges}
          />
        ) : (
          <></>
        )}
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
          {!isMobile ? (
            <FilterMenu
              vendors={vendors.data.shop.productVendors.edges}
              types={types.data.productTypes.edges}
              collections={collections.data.collections.edges}
            />
          ) : (
            <></>
          )}

          <div className="relative w-11/12 md:w-full xl:w-10/12">
            <div
              id="shop-grid"
              className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 gap-y-10"
            >
              {dataArr.map((e, i) => (
                <SingeProduct key={i} index={i} e={e} />
              ))}
            </div>
            {data ? (
              <></>
            ) : (
              <Pagination
                isPrevious={isPrevious}
                isNext={isNext}
                cursorFirst={cursorNext}
                cursorLast={cursorLast}
                setDirection={setDirection}
              />
            )}
          </div>
        </div>
      </div>
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

  let _vendor = await vendorsGet(),
    types = await productTypeGet(),
    collections = await collectionGet();

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
      vendors: vendors ? decodeURIComponent(vendors) : undefined,
      type: type ? decodeURIComponent(type) : undefined,
    })
  );
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {
      vendors: _vendor,
      types: types,
      collections: collections,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
