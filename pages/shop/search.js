import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import useProductSearch from "../../utils/hooks/useProductSearch";

import Breadcrumbs from '../../components/common/Breadcrumbs'
import SingeProduct from "../../components/Shop/single-product";
import Loading from "../../components/Loading/dataLoading";

export default function SearchPage() {
  const router = useRouter();
  const query = router.query;
  const [dataArr, setDataArr] = useState([]);
  const [isNext, setNext] = useState(false)
  const [isPrevious, setPrevious] = useState(false)
  const productSearch = useProductSearch();

  useEffect(() => {
    if (router.isReady) {
      if (query.query !== undefined) {
        productSearch.mutate({ search: query.query });
      }
    }
  }, [router.isReady]);

  useEffect(() => {
    setDataArr([])
    if (productSearch.data && !productSearch.isLoading) {
      setDataArr(productSearch.data.data.products.edges);
      setNext(productSearch.data.data.products.pageInfo.hasNextPage)
      setPrevious(productSearch.data.data.products.pageInfo.hasPreviousPage)
    }
  }, [productSearch.isLoading]);

  return (
    <>
      <Breadcrumbs path={[
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: `Search - ${query.query}`, path: "#" }
      ]}/>
      <div className="flex justify-center items-center space-x-5">
        <button
          disabled={!isPrevious}
          onClick={() => {
            let cursor = dataArr[0].cursor;
            productSearch.mutate({ search: query.query, cursor: cursor, direction: false });
          }}
        >
          Previous
        </button>
        <button
          disabled={!isNext}
          onClick={() => {
            let cursor = dataArr[dataArr.length - 1].cursor;
            productSearch.mutate({ search: query.query, cursor: cursor, direction: true });
          }}
        >
          Next
        </button>
      </div>

      <div className="flex justify-center">
        <div className="w-11/12 xl:w-3/4">
          <div className="grid grid-cols-4 gap-1 xl:gap-5">
            {
              productSearch.isLoading ?
              <Loading />
              :
              dataArr.map((e, i) => (
                <SingeProduct index={i} e={e} key={i} />
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
}
