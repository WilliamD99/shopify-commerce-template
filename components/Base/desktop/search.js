import React, { useEffect, useState, useRef, useCallback } from "react";
import { gsap, formatter } from "../../../utils/utils";
import { debounce } from "lodash";

import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Link from "../../common/Link";
import Image from "../../common/Image";
import Loading from "../../Loading/dataLoading";
import { FiSearch } from "react-icons/fi";

import { useRouter } from "next/router";
import { productSearchTemp } from "../../../lib/serverRequest";
import { useQuery } from "@tanstack/react-query";

export default function Search() {
  let [show, setShow] = useState(false);
  let [searchQuery, setSearchQuery] = useState();
  let router = useRouter();

  const { data, isLoading, isFetching, isSuccess } = useQuery(
    [`search-${searchQuery}`],
    () => productSearchTemp({ search: searchQuery, number: 7 }),
    { enabled: Boolean(searchQuery) }
  );

  let search = useCallback((criteria) => {
    if (criteria === "") {
      setSearchQuery(null);
    } else {
      setSearchQuery(criteria);
    }
  }, []);

  const debouncedSearch = useRef(
    debounce((criteria) => {
      search(criteria);
    }, 500)
  ).current;

  let handleChange = useCallback(async (e) => {
    debouncedSearch(e.target.value);
  }, []);

  let handleSubmit = useCallback((e) => {
    e.preventDefault();
    let input = document.querySelector("#search");
    router.push(`/shop/search/${input.value}`);
    // resultsAnimRef.current.reverse();
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Handle search animation
  // let resultsAnimRef = useRef(null);
  // useEffect(() => {
  //   resultsAnimRef.current = gsap
  //     .timeline({
  //       paused: true,
  //       onStart: () => {
  //         console.log('running')
  //         document
  //           .querySelector("#search-results")
  //           .classList.remove("invisible");
  //       },
  //       onReverseComplete: () => {
  //         console.log('end')
  //         document
  //           .querySelector("#search-results")
  //           .classList.add("invisible");
  //       },
  //       ease: "Sine.easeInOut",
  //       duration: 0.3,
  //     })
  //     .fromTo(
  //       "#search-results",
  //       {
  //         autoAlpha: 0,
  //       },
  //       {
  //         autoAlpha: 1,
  //       }
  //     )
  //     .fromTo(
  //       "#search-results .search-results_content",
  //       { autoAlpha: 0, y: 20 },
  //       { autoAlpha: 1, y: 0, stagger: (i) => i * 0.15 },
  //       "<0.1"
  //     );

  //   return () => {
  //     resultsAnimRef.current.kill();
  //   };
  // }, []);

  return (
    <>
      <div
        id="search-bar"
        onBlur={() => setShow(false)}
        onFocus={() => setShow(true)}
        className="lg:w-96 relative flex flex-col items-end justify-center"
      >
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-row space-x-2 justify-center items-end"
        >
          <TextField
            id="search"
            label={
              <span className="ml-2 flex flex-row items-center">
                <FiSearch className="mr-2" /> Search
              </span>
            }
            variant="outlined"
            className="text-black border-black rounded-3xl bg-gray-100"
            onChange={handleChange}
          />
        </form>

        {!(!isFetching && !isSuccess) && show ? (
          <div
            id="search-results"
            className={`absolute bg-white z-50 sb-custom rounded-md translate-y-full max-h-44 overflow-auto overflow-x-hidden -bottom-3 border-2 w-full`}
          >
            {!isFetching ? (
              <>
                {data.data.products.edges.map((e, i) => (
                  <Link
                    href={`/product/${e.node.handle}`}
                    key={i}
                    className="w-full search-results_content flex flex-col justify-center transition ease-in-out hover:bg-slate-100"
                  >
                    <div className="relative bg-white px-3 py-3 flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center space-x-2">
                        <div className="relative h-8 w-8">
                          <Image
                            alt={e.node.handle}
                            layout="fill"
                            src={e.node.featuredImage.url}
                          />
                        </div>
                        <p className="text-sm">{e.node.title}</p>
                      </div>
                      <div className="">
                        <p className="text-xs">
                          {e.node.priceRangeV2.maxVariantPrice.amount ===
                          e.node.priceRangeV2.minVariantPrice.amount
                            ? formatter.format(
                                e.node.priceRangeV2.maxVariantPrice.amount
                              )
                            : `${formatter.format(
                                e.node.priceRangeV2.minVariantPrice.amount
                              )} - ${formatter.format(
                                e.node.priceRangeV2.maxVariantPrice.amount
                              )}`}
                        </p>
                      </div>
                    </div>
                    <Divider />
                  </Link>
                ))}
                {data.data.products.edges.length > 0 ? (
                  <Link
                    href={`/shop/search/${searchQuery}`}
                    className="w-full search-results_content flex flex-col justify-center transition ease-in-out hover:bg-slate-100"
                  >
                    <div className="px-3 py-3 flex justify-center">
                      <p className="text-sm font-medium">View All</p>
                    </div>
                  </Link>
                ) : (
                  <div className="px-3 py-3 flex justify-center">
                    <p className="text-sm font-medium">No data found</p>
                  </div>
                )}
              </>
            ) : (
              <p className="flex justify-center items-center px-3 py-16 font-semibold"></p>
            )}
            {isFetching ? (
              <div className="absolute top-0 z-50 w-full h-full backdrop-blur-sm">
                <Loading />
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
