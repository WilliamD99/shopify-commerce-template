import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { isEmptyObj } from "../utils/utils";

// Hooks
import useGetAllProduct from "../utils/hooks/useGetAllProduct";
import useGetTotal from "../utils/hooks/useGetTotal";
import { productAll, productAllStorefront } from "../utils/api/requests";
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
  const router = useRouter()
  const routerQuery = router.query

  // State for query
  const [query, setQuery] = useState([])
  const [sortKey, setSortKey] = useState()
  const [isReverse, setReverse] = useState(false)
  const [cursorNext, setCursorNext] = useState()
  const [cursorLast, setCursorLast] = useState()
  const [direction, setDirection] = useState(true)
  const [path, setPath] = useState('admin')

  let total = useGetTotal();

  // Init page with products
  let products = useGetAllProduct({});

  useEffect(() => {
    setDataArr([]);
    if (products.data && isEmptyObj(routerQuery)) {
      let edges = products.data.products.edges;
      setDataArr(edges);
      setCount(edges.length);
      setNext(products.data.products.pageInfo.hasNextPage);
      setPrevious(products.data.products.pageInfo.hasPreviousPage);

      setCursorNext(edges[0].cursor)
      setCursorLast(edges[edges.length - 1].cursor)
    }
    if (routerQuery.path === 'admin') {
      mutateProductAdmin.mutate({ query: decodeURIComponent(routerQuery.query), sortKey: routerQuery.sort_key, isReverse: routerQuery.reverse.toString(), cursor: routerQuery.cursor })
    }
    if (routerQuery.path === 'sf') {
      mutateProductNextSf.mutate({ query: decodeURIComponent(routerQuery.query), sortKey: routerQuery.sort_key, isReverse: routerQuery.reverse.toString(), cursor: routerQuery.cursor })
    }
  }, [router.isReady, products.isLoading, routerQuery])

  // Handle next/previous page + filter admin
  let mutateProductAdmin = useMutation(async (params) => {
    let data = await productAll({
      cursor: params.cursor,
      direction: direction,
      sortKey: params.sortKey ? params.sortKey : sortKey,
      reversed: params.isReverse ? params.isReverse : isReverse,
      query: params.query ? JSON.parse(params.query) : query
    });
    let edges = data.data.products.edges;
    setDataArr(edges);
    setNext(data.data.products.pageInfo.hasNextPage);
    setPrevious(data.data.products.pageInfo.hasPreviousPage);

    setCursorNext(edges[0].cursor)
    setCursorLast(edges[edges.length - 1].cursor)

    if (direction) setCount(edges.length + count);
    else setCount(count - edges.length);
    return data.data;
  });

  let mutateProductNextSf = useMutation(async (params) => {
    let data = await productAllStorefront({
      cursor: params.cursor,
      direction: direction,
      sortKey: params.sortKey ? params.sortKey : sortKey,
      reversed: params.isReverse ? params.isReverse : isReverse,
      query: params.query ? params.query : query
    })
    let edges = data.data.products.edges;
    setDataArr(edges);
    setNext(data.data.products.pageInfo.hasNextPage);
    setPrevious(data.data.products.pageInfo.hasPreviousPage);

    setCursorNext(edges[0].cursor)
    setCursorLast(edges[edges.length - 1].cursor)

    if (direction) setCount(edges.length + count);
    else setCount(count - edges.length);
    return data.data;  
  })

  return (
    <>
      <Breadcrumbs
        path={[
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
        ]}
      />

      <div id="shop-container" className="px-10">
        <FilterBar
          count={count}
          length={dataArr.length}
          isLoading={products.isLoading}
          total={total.data ? total.data.count : 0}
          setSortKey={setSortKey}
          setReverse={setReverse}
          setPath={setPath}
        />

        <div id="shop" className="flex flex-row justify-between mt-5 space-x-8 z-50">
          <FilterMenu isLoading={products.isLoading}/>

          <div className="relative w-9/12 xl:w-10/12">
            <div id="shop-grid" className="grid grid-cols-3 xl:grid-cols-4 gap-5 gap-y-10">
              {products.isLoading || mutateProductAdmin.isLoading || mutateProductNextSf.isLoading ? (
                <Loading />
              ) : (
                dataArr.map((e, i) => <SingeProduct key={i} index={i} e={e} />)
              )}
            </div>
            {
              products.isLoading || mutateProductAdmin.isLoading || mutateProductNextSf.isLoading ?
              <></>
              :
              <Pagination 
                isPrevious={isPrevious}
                isNext={isNext}
                cursorFirst={cursorNext} 
                cursorLast={cursorLast}
                setDirection={setDirection}
              />
            }
          </div>
        </div>
      </div>
    </>
  );
}
