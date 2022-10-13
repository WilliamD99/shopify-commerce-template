import { useState, useEffect } from "react";

// Hooks
import { useRouter } from "next/router";
import useGetTotal from "../utils/hooks/useGetTotal";
import { productAllStorefront } from "../utils/api/requests";
import { useMutation } from "@tanstack/react-query";

// Components
import Loading from "../components/Loading/dataLoading";
import Breadcrumbs from "../components/common/Breadcrumbs";
import SingeProduct from "../components/Shop/single-product";
import FilterBar from "../components/Shop/filterBar";
import FilterMenu from "../components/Shop/filterMenu";
import Pagination from "../components/Shop/pagination";

export default function Shop() {
  const [dataArr, setDataArr] = useState([]);
  const [count, setCount] = useState(0);
  const [isNext, setNext] = useState(false);
  const [isPrevious, setPrevious] = useState(false);
  const router = useRouter();
  const routerQuery = router.query;

  // State for query
  const [sortKey, setSortKey] = useState();
  const [isReverse, setReverse] = useState(false);
  const [cursorNext, setCursorNext] = useState();
  const [cursorLast, setCursorLast] = useState();
  const [direction, setDirection] = useState(true);

  let total = useGetTotal();

  useEffect(() => {
    setDataArr([]);
    if (router.isReady) {
      mutateProductNextSf.mutate({
        sortKey: routerQuery.sort_key,
        isReverse: routerQuery.reverse ? routerQuery.reverse.toString() : "",
        cursor: routerQuery.cursor,
        price: routerQuery.price,
        instock: routerQuery.instock,
        vendors: routerQuery.vendors
          ? decodeURIComponent(routerQuery.vendors)
          : "",
        type: routerQuery.type ? decodeURIComponent(routerQuery.type) : "",
        limit: routerQuery.limit,
      });
      // }
    }
  }, [routerQuery]);

  let mutateProductNextSf = useMutation(async (params) => {
    let data = await productAllStorefront({
      cursor: params.cursor,
      direction: direction,
      sortKey: params.sortKey ? params.sortKey : sortKey,
      reversed: params.isReverse ? params.isReverse : isReverse,
      price: params.price,
      instock: params.instock,
      vendors: params.vendors,
      type: params.type,
      limit: params.limit,
    });
    let edges = data.data.products.edges;
    setDataArr(edges);
    setNext(data.data.products.pageInfo.hasNextPage);
    setPrevious(data.data.products.pageInfo.hasPreviousPage);

    setCursorNext(edges[0].cursor);
    setCursorLast(edges[edges.length - 1].cursor);

    if (direction) setCount(edges.length + count);
    else setCount(count - edges.length);
    return data.data;
  });

  return (
    <>
      <Breadcrumbs
        path={[
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
        ]}
      />

      <div id="shop-container" className="px-3 md:px-10">
        <FilterBar
          count={count}
          length={dataArr.length}
          isLoading={mutateProductNextSf.isLoading}
          total={total.data ? total.data.count : 0}
          setSortKey={setSortKey}
          setReverse={setReverse}
        />

        <div
          id="shop"
          className="flex flex-row justify-center xl:justify-between mt-5 md:space-x-8 z-50"
        >
          <FilterMenu isLoading={mutateProductNextSf.isLoading} />

          <div className="relative md:w-full xl:w-10/12">
            <div
              id="shop-grid"
              className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-5 gap-y-10"
            >
              {mutateProductNextSf.isLoading ? (
                <Loading />
              ) : (
                dataArr.map((e, i) => <SingeProduct key={i} index={i} e={e} />)
              )}
            </div>
            {mutateProductNextSf.isLoading ? (
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
// if (routerQuery.path === "admin" || !routerQuery.path) {
//   mutateProductAdmin.mutate({
//     sortKey: routerQuery.sort_key,
//     isReverse: routerQuery.reverse ? routerQuery.reverse.toString() : "",
//     cursor: routerQuery.cursor,
//     price: routerQuery.price,
//     sales: routerQuery.sales,
//     vendors: routerQuery.vendors
//       ? decodeURIComponent(routerQuery.vendors)
//       : "",
//     type: routerQuery.type ? decodeURIComponent(routerQuery.type) : "",
//   });
// }
// if (routerQuery.path === "sf") {

// // Handle next/previous page + filter admin
// let mutateProductAdmin = useMutation(async (params) => {
//   let data = await productAll({
//     cursor: params.cursor,
//     direction: direction,
//     sortKey: params.sortKey ? params.sortKey : sortKey,
//     reversed: params.isReverse ? params.isReverse : isReverse,
//     price: params.price,
//     sales: params.sales,
//     vendors: params.vendors,
//     type: params.type,
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
