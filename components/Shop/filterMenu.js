import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import { gsap } from "../../utils/utils";
import { useRouter } from "next/router";

import Divider from "@mui/material/Divider";
import Loading from "../Loading/dataLoading";
import Link from "../common/Link";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PriceFilter from "./filter/price";

export default function FilterMenu({ isLoading }) {
  // const filterMenuAnim = useRef(null)
  let [collections, setCollections] = useState([]);
  let router = useRouter();
  let routerQuery = router.query;

  // useLayoutEffect(() => {
  //   filterMenuAnim.current = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: "#shop-container",
  //       start: "top top",
  //       end: "center+=800 bottom",
  //       pin: "#filter",
  //     },
  //   });
  //   return () => filterMenuAnim.current.kill();
  // }, [isLoading]);

  let collectionQuery = useQuery(["get_collections"], async () => {
    let data = await axios.post("/api/admin/query/all-collections");
    return data.data;
  });
  useEffect(() => {
    if (collectionQuery.data)
      setCollections(collectionQuery.data.data.collections.edges);
  }, [collectionQuery.isLoading]);

  return (
    <>
      <div
        id="filter"
        className="filter-menu hidden md:block overflow-scroll overflow-x-hidden sb-custom w-3/12 xl:w-2/12 bg-slate-50 px-3 py-5"
      >
        <div className="py-2 mb-10 h-56">
          <p className="text-lg font-semibold">Category</p>
          <div className="relative sb-custom h-full flex flex-col space-y-2 overflow-scroll overflow-x-hidden py-4 pl-2">
            {!collectionQuery.isLoading ? (
              collectionQuery.data ? (
                collections.map((e) => (
                  <div
                    key={e.node.handle}
                    className="flex flex-row justify-between items-center"
                  >
                    <Link
                      className={`${
                        decodeURIComponent(routerQuery.col) === e.node.id
                          ? "font-semibold"
                          : ""
                      }`}
                      href={{
                        pathname: "/shop/products-in-collection/",
                        query: { col: encodeURIComponent(e.node.id) },
                      }}
                    >
                      {e.node.title}
                    </Link>
                    <p className="text-xs opacity-70">{e.node.productsCount}</p>
                  </div>
                ))
              ) : (
                <p>No collections found</p>
              )
            ) : (
              <Loading />
            )}
          </div>
        </div>

        <Divider />

        {/* <div className='py-5 mb-10 h-56'>
                    <p className='text-lg font-semibold'>Brand</p>
                    <p>AgroLED</p>
                </div> */}

        <Divider />

        <div
          id="price-filter"
          className="py-5 mb-10 h-56 flex flex-col space-y-3"
        >
          <PriceFilter />
        </div>
      </div>
    </>
  );
}
