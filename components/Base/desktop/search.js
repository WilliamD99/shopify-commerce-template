import React, { useEffect, useState, useRef, useCallback } from "react";
import { gsap, formatter } from "../../../utils/utils";
import { debounce } from "lodash";

import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Link from "../../common/Link";
import Image from "../../common/Image";
import Loading from "../../Loading/dataLoading";

import { useRouter } from "next/router";
import useProductSearch from "../../../utils/hooks/useProductSearch";

export default function Search() {
  let [searchQuery, setSearchQuery] = useState();
  let [searchData, setSearchData] = useState([]);
  let searchProduct = useProductSearch();
  let router = useRouter();

  let search = useCallback((criteria) => {
    if (criteria === "") {
      setSearchData([]);
      setSearchQuery(null);
    } else {
      setSearchQuery(criteria);
      searchProduct.mutate({ search: criteria });
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
    router.push(`/shop/search/products?search=${searchQuery}`);
    resultsAnimRef.current.reverse();
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // handle search data
  useEffect(() => {
    if (searchProduct.data) {
      console.log(searchProduct.data);
      if (searchProduct.data.products.edges.length > 0)
        setSearchData(searchProduct.data.products.edges);
      resultsAnimRef.current.play();
    }
  }, [searchProduct.data]);

  // Handle search animation
  let resultsAnimRef = useRef(null);
  useEffect(() => {
    resultsAnimRef.current = gsap
      .timeline({
        paused: true,
        onStart: () => {
          document
            .querySelector("#search-results")
            .classList.remove("invisible");
        },
        ease: "Sine.easeInOut",
        duration: 0.3,
      })
      .fromTo(
        "#search-results",
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
        }
      )
      .fromTo(
        "#search-results .search-results_content",
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, stagger: (i) => i * 0.15 },
        "<0.1"
      );

    return () => {
      resultsAnimRef.current.kill();
    };
  }, []);

  return (
    <>
      <div
        id="search-bar"
        onBlur={() => resultsAnimRef.current.reverse()}
        onFocus={() => {
          if (searchData.length > 0) resultsAnimRef.current.play();
        }}
        className="w-44 relative flex flex-col items-end justify-center"
      >
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-row space-x-2 justify-center items-end"
        >
          <TextField
            size="small"
            id="search"
            label={<span className="ml-2">Search</span>}
            variant="outlined"
            className="text-black border-black rounded-3xl bg-gray-100"
            onChange={handleChange}
          />
        </form>
        <div
          id="search-results"
          className="absolute bg-white invisible z-50 sb-custom rounded-md translate-y-full max-h-44 overflow-auto overflow-x-hidden -bottom-3 border-2 w-full"
        >
          {searchData.length > 0 ? (
            <>
              {searchData.map((e, i) => (
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
              <Link
                href={`/shop/search/products?search=${searchQuery}`}
                className="w-full search-results_content flex flex-col justify-center transition ease-in-out hover:bg-slate-100"
              >
                <div className="px-3 py-3 flex justify-center">
                  <p className="text-sm font-medium">View All</p>
                </div>
              </Link>
            </>
          ) : (
            <p className="flex justify-center items-center px-3 py-16 font-semibold">
              No data
            </p>
          )}
          {searchProduct.isLoading ? (
            <div className="absolute top-0 z-50 w-full h-full backdrop-blur-sm">
              <Loading />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
