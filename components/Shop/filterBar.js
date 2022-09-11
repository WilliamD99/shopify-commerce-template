import React, { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "../../utils/utils";
import { useRouter } from "next/router";

import { IoIosArrowDown } from "react-icons/io";
import Button from "@mui/material/Button";
import FilterCheckbox from "./filterCheckbox";
import Link from '../common/Link'

export default function Filter({ 
  length, isLoading, count, total, setSortKey, setReverse, setPath
}) {
  const filterBarAnim = useRef(null);
  const router = useRouter()
  const routerQuery = router.query
  const sortRefFocus = useRef(null)

  // Pin the bar while scrolling
  // useLayoutEffect(() => {
  //   filterBarAnim.current = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: "#shop-container",
  //       start: "top top",
  //       end: "bottom bottom",
  //       pin: "#filter-bar",
  //     },
  //   });
  //   return () => filterBarAnim.current.kill();
  // }, [isLoading]);

  // Create animation for sort dropdown
  useEffect(() => {
    sortRefFocus.current = gsap.timeline({paused: true}).fromTo(
      "#sort_dropdown",
      {
        top: -10,
        autoAlpha: 0,
      },
      {
        top: 30,
        autoAlpha: 1,
        duration: 0.1,
        ease: "Sine.easeInOut",
        onStart: () => {
          document.querySelector("#sort_dropdown").classList.toggle("invisible");
        },
        onReverseComplete: () => {
          document.querySelector("#sort_dropdown").classList.toggle("invisible");
        }
      }
    )
  }, [])

  // Handle Dropdown animation
  let sortByFunction = () => {
    let sortDropdown = document.querySelector("#sort_dropdown");
    let sortIcon = document.querySelector("#sort_icon");
    sortIcon.classList.toggle("rotate-180");

    if (sortDropdown.classList.contains("invisible")) {
      sortRefFocus.current.play()
    } else {
      sortRefFocus.current.reverse()
    }
  };

  // Handle sorting router
  const handleSortingClick = async (key, reverse, path) => {
    setPath(path)
    routerQuery.sort_key = key
    routerQuery.reverse = reverse.toString()
    routerQuery.path = path
    router.push({
      pathname: window.location.pathname,
      query: routerQuery
    }, undefined)

    await setSortKey(key)
    await setReverse(reverse)
  }

  return (
    <>
      <div
        id="filter-bar"
        className="filter-menu flex flex-row justify-between bg-white py-6 z-40 -mb-8"
      >
        <div id="filter-bar__product-number">
          <p className="text-lg">
            Showing
            <span className="mx-1">
              {count === 12 ? "1-12" : `${count - length + 1}-${count}`}
            </span>
            of
            <span className="mx-1">
              {total}
            </span>
          </p>
        </div>
        <div className="flex flex-row">
          <Button>
            <Link href="/shop">Clear Filter</Link>
          </Button>
          {
            routerQuery.col ? 
            <></>
            :
            <FilterCheckbox />
          }

          <div id="sort" className="relative">
            <Button
              className="normal-case text-lg text-black z-50"
              onClick={() => sortByFunction()}
              // onBlur={() => {
              //   if (!sortRefFocus.current.reversed()) {
              //     let sortIcon = document.querySelector("#sort_icon");
              //     sortIcon.classList.toggle("rotate-180");
              //     sortRefFocus.current.reverse()
              //   }
              // }}
            >
              Sort By <IoIosArrowDown id="sort_icon" className="ml-2 ease-in" />
            </Button>
            <div
              id="sort_dropdown"
              className="w-52 h-48 px-4 invisible absolute -right-8 flex flex-col justify-center items-center bg-white z-40"
            >
              <Button className="text-sm w-full text-black" onClick={() => handleSortingClick('TITLE', false, routerQuery.col ? '' : 'admin')}>Title (A-Z)</Button>
              <Button className="text-sm w-full text-black" onClick={() => handleSortingClick('TITLE', true, routerQuery.col ? '' : 'admin')}>Title (Z-A)</Button>
              {
                !routerQuery.path || routerQuery.path === 'sf' ?
                <>
                  <Button className="text-sm w-full text-black" onClick={() => handleSortingClick('PRICE', true, routerQuery.col ? '' : 'sf')}>Price (High-Low)</Button>
                  <Button className="text-sm w-full text-black" onClick={() => handleSortingClick('PRICE', false, routerQuery.col ? '' : 'sf')}>Price (Low-High)</Button>
                </>
                :
                <></>
              }
              <Button className="text-sm w-full text-black" onClick={() => handleSortingClick('CREATED_AT', true, 'admin')}>Latest Arrival</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
