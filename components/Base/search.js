import React, { useEffect, useState, useRef } from "react";
import useCustomerGet from "../../utils/hooks/useCustomerGet";
import { decryptText, gsap } from "../../utils/utils";
import { debounce } from "lodash";
// import Login from "../components/User/login";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { BsSearch } from "react-icons/bs";
import Divider from "@mui/material/Divider";
import Link from "../common/Link";

import useProductSearch from "../../utils/hooks/useProductSearch";

export default function Search() {
  let [searchQuery, setSearchQuery] = useState();
  let [searchData, setSearchData] = useState([1, 2, 3, 5, 6, 7, 8, 9, 10, 15]);
  let searchProduct = useProductSearch();

  let search = async (criteria) => {
    setSearchQuery(criteria);
    resultsAnimRef.current.play();
    // let data = await searchProduct.mutate({search: criteria})
    // setSearchData(data.data)
  };

  const debouncedSearch = useRef(
    debounce((criteria) => {
      search(criteria);
    }, 500)
  ).current;

  let handleChange = async (e) => {
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  let resultsAnimRef = useRef(null);
  useEffect(() => {
    resultsAnimRef.current = gsap
      .timeline({
        paused: true,
        onStart: () => {
          document.querySelector("#search-results").classList.remove("hidden");
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
        onBlur={() => resultsAnimRef.current.reverse()}
        onFocus={() => resultsAnimRef.current.play()}
        className="ml-20 w-96 relative flex flex-col justify-start"
      >
        <div className="flex flex-row space-x-2 items-end">
          <TextField
            id="search"
            label="Search"
            variant="standard"
            onChange={handleChange}
            onClick={() => {
              console.log("test");
            }}
            onSubmit={() => {
              console.log("test2");
            }}
          />
          <div className="border-2 px-2 rounded-full cursor-pointer transition ease-in-out hover:bg-slate-100">
            <BsSearch className="my-2 text-white" />
          </div>
        </div>
        <div
          id="search-results"
          className="absolute sb-custom hidden rounded-md translate-y-full max-h-44 overflow-auto overflow-x-hidden -bottom-3 border-2 w-full"
        >
          {searchData.map((e, i) => (
            <Link
              href="#"
              key={i}
              className="w-full search-results_content flex flex-col justify-center transition ease-in-out hover:bg-slate-100"
            >
              <div className="px-3 py-3 ">
                <p>test</p>
              </div>
              {i === searchData.length - 1 ? <></> : <Divider />}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
