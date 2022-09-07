import { useState, useEffect } from "react";
// Components
import Loading from "../components/Loading/dataLoading";
// import Error from "../components/Error";
import SingeProduct from "../components/Shop/single-product";
// import Filter from "../components/Shop/filter";
// import Sorting from "../components/Shop/sorting";
import Breadcrumbs from "../components/common/Breadcrumbs";
// Hooks
import useGetAllProduct from "../utils/hooks/useGetAllProduct";
import useGetTotal from "../utils/hooks/useGetTotal";

import { productAll } from "../utils/api/requests";
import { useMutation } from "@tanstack/react-query";
import FilterBar from "../components/Shop/filter";

export default function Shop() {
  const [dataArr, setDataArr] = useState([]);
  const [count, setCount] = useState(0);
  const [isNext, setNext] = useState(false);
  const [isPrevious, setPrevious] = useState(false);

  // Init page with products
  let products = useGetAllProduct({});
  let total = useGetTotal();
  useEffect(() => {
    setDataArr([]);
    if (products.data) {
      let edges = products.data.products.edges;
      setDataArr(edges);
      setCount(edges.length);
      setNext(products.data.products.pageInfo.hasNextPage);
      setPrevious(products.data.products.pageInfo.hasPreviousPage);
    }
  }, [products.isLoading]);

  // Handle next/previous page
  let mutateProductNext = useMutation(async (params) => {
    let data = await productAll({
      cursor: params.cursor,
      direction: params.direction,
      sortKey: params.sortKey,
      reversed: params.reversed,
    });
    let edges = data.data.products.edges;
    setDataArr(edges);
    setNext(data.data.products.pageInfo.hasNextPage);
    setPrevious(data.data.products.pageInfo.hasPreviousPage);
    if (params.direction) setCount(edges.length + count);
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
      {/* <Filter /> */}
      {/* <Sorting mutateProductNext={mutateProductNext}/> */}

      <div id="shop-container" className="px-10">
        <FilterBar
          count={count}
          length={dataArr.length}
          isLoading={products.isLoading}
        />

        <div id="shop" className="flex justify-between mt-5 space-x-8 z-50">
          <div className="w-2/12 bg-black h-screen"></div>
          <div className="w-10/12 xl:w-10/12">
            <div id="shop-grid" className="grid grid-cols-4 gap-5 gap-y-10">
              {products.isLoading || mutateProductNext.isLoading ? (
                <Loading />
              ) : (
                dataArr.map((e, i) => <SingeProduct key={i} index={i} e={e} />)
              )}
            </div>
            <div className="flex justify-center items-center space-x-5 mt-5">
              <button
                disabled={!isPrevious}
                onClick={() => {
                  let cursor = dataArr[0].cursor;
                  mutateProductNext.mutate({
                    cursor: cursor,
                    direction: false,
                  });
                }}
              >
                Previous
              </button>
              <button
                disabled={!isNext}
                onClick={() => {
                  let cursor = dataArr[dataArr.length - 1].cursor;
                  mutateProductNext.mutate({ cursor: cursor, direction: true });
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Show product count */}
    </>
  );
}
