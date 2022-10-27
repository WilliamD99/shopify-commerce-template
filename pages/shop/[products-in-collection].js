import React, { useEffect, useState, useContext } from "react";
import deviceContext from "../../utils/deviceContext";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import useProductByCollection from "../../utils/hooks/useProductByCollection";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";
import { collectionGet, vendorsGet, productTypeGet } from '../../lib/serverRequest'

import SingleProduct from "../../components/Shop/single-product";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Loading from "../../components/Loading/dataLoading";

const FilterMenu = dynamic(() => import("../../components/Shop/filterMenu"));
const FilterBar = dynamic(() => import("../../components/Shop/filterBar"));
const FilterDrawer = dynamic(() =>
  import("../../components/Shop/filterDrawer")
);
import Pagination from "../../components/Shop/pagination";
import {
  collectionGet,
  productTypeGet,
  vendorsGet,
} from "../../lib/serverRequest";
import { NextSeo } from "next-seo";

export default function Collection({ vendors, types, collections }) {
  const { isMobile } = useContext(deviceContext);
  const router = useRouter();
  const routerQuery = router.query;
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

      <div id="shop-container">
        {!isMobile ? (
          <FilterBar
            total={products.data ? products.data.collection.productsCount : 0}
            isLoading={products.isLoading}
            length={dataArr.length}
            count={dataArr.length}
            setSortKey={setSortKey}
            setReverse={setReverse}
          />
        ) : (
          <></>
        )}
        <div className="flex flex-row justify-center xl:justify-between mt-5 md:space-x-8 z-50">
          {!isMobile ? (
            <FilterMenu
              vendors={vendors.data.shop.productVendors.edges}
              types={types.data.productTypes.edges}
              collections={collections.data.collections.edges}
              isLoading={products.isLoading}
            />
          ) : (
            <></>
          )}

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
export async function getServerSideProps() {
  let vendors = await vendorsGet(),
    types = await productTypeGet(),
    collections = await collectionGet();



  return {
    props: {
      vendors: vendors,
      types: types,
      collections: collections,
    },
  };
}
