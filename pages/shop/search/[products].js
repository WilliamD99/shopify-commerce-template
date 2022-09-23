import React, { useEffect, useState } from "react";

// Hooks
import { useRouter } from "next/router";
import useProductSearch from "../../../utils/hooks/useProductSearch";

// Components
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import FilterMenu from "../../../components/Shop/filterMenu";
import Filter from "../../../components/Shop/filterBar";
import Pagination from "../../../components/Shop/pagination";

export default function Search() {
  let router = useRouter();
  let routerQuery = router.query;
  let productSearch = useProductSearch();
  const [isNext, setNext] = useState(false);
  const [isPrevious, setPrevious] = useState(false);
  const [dataArr, setDataArr] = useState([]);
  const [cursorNext, setCursorNext] = useState();
  const [cursorLast, setCursorLast] = useState();
  const [direction, setDirection] = useState(true);

  useEffect(() => {
    if (routerQuery.search) {
      if (routerQuery.search !== "") {
        productSearch.mutate({
          search: routerQuery.search,
          sortKey: routerQuery.sort_key,
          reverse: routerQuery.reverse,
          price: routerQuery.price,
          sales: routerQuery.sales,
          direction: direction,
          cursor: routerQuery.cursor,
        });
      }
    }
  }, [routerQuery]);

  useEffect(() => {
    if (productSearch.data) {
      console.log(productSearch.data);
      setDataArr(productSearch.data.products.edges);
      setNext(productSearch.data.products.pageInfo.hasNextPage);
      setPrevious(productSearch.data.products.pageInfo.hasPreviousPage);
      setCursorLast(
        productSearch.data.products.edges[
          productSearch.data.products.edges.length - 1
        ].cursor
      );
      setCursorNext(productSearch.data.products.edges[0].cursor);
    }
  }, [productSearch.data]);

  return (
    <>
      <Breadcrumbs
        path={[
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          { name: `Search: "${routerQuery.search}"`, path: "#" },
        ]}
      />
      <div>Search</div>
      {productSearch.isLoading ? (
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
    </>
  );
}
