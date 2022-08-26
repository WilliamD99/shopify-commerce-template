import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import useProductSearch from "../../utils/hooks/useProductSearch";

import Image from "../../components/common/Image";
import Button from "@mui/material/Button";
import Link from "../../components/common/Link";

import SingeProduct from "../../components/Shop/single-product";

export default function SearchPage() {
  const router = useRouter();
  const query = router.query;
  const [dataArr, setDataArr] = useState([]);
  const productSearch = useProductSearch();

  useEffect(() => {
    if (router.isReady) {
      if (query.query !== undefined) {
        productSearch.mutate({ search: query.query });
      }
    }
  }, [router.isReady]);

  useEffect(() => {
    if (productSearch.data && !productSearch.isLoading) {
      console.log(productSearch.data.data.products.edges);
      setDataArr(productSearch.data.data.products.edges);
    }
  }, [productSearch.isLoading]);

  return (
    <>
      <div className="flex justify-center">
        <div className="w-3/4">
          <div className="grid grid-cols-4 gap-5">
            {dataArr.map((e, i) => (
              <SingeProduct e={e} key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
