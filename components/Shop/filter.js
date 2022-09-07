// import React, { useState } from 'react'
// import Link from '../common/Link'
// import useAllCollection from '../../utils/hooks/useAllCollection'

// export default function Filter() {
//     let collections = useAllCollection()

//     return (
//         <div className='grid grid-cols-4 gap-5'>
//             {
//                 collections.data !== undefined ?
//                 collections.data.collections.edges.map((e, i) => (
//                     <div key={i} className="bg-slate-200 flex justify-center items-center">
//                         <Link href={`/shop/products-in-collection?col=${e.node.id}`}>{e.node.title}</Link>
//                     </div>
//                 ))
//                 :
//                 <></>
//             }
//         </div>
//     )
// }

import React, { useLayoutEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { gsap } from "../../utils/utils";
import { IoIosArrowDown } from "react-icons/io";
import useGetTotal from "../../utils/hooks/useGetTotal";

export default function Filter({ length, isLoading, count }) {
  const filterBarAnim = useRef(null);

  let total = useGetTotal();

  useLayoutEffect(() => {
    filterBarAnim.current = gsap.timeline({
      scrollTrigger: {
        trigger: "#shop-container",
        start: "top top",
        end: "bottom bottom",
        pin: "#filter-bar",
      },
    });
    return () => filterBarAnim.current.kill();
  }, [isLoading]);

  let sortByFunction = () => {
    let sortDropdown = document.querySelector("#sort_dropdown");
    let sortIcon = document.querySelector("#sort_icon");
    sortIcon.classList.toggle("rotate-180");

    console.log(sortDropdown.classList.contains("invisible"));
    if (sortDropdown.classList.contains("invisible")) {
      gsap.fromTo(
        "#sort_dropdown",
        {
          top: -10,
          autoAlpha: 0,
        },
        {
          top: 0,
          autoAlpha: 1,
          duration: 0.1,
          ease: "Sine.easeInOut",
          onStart: () => {
            sortDropdown.classList.toggle("invisible");
          },
        }
      );
    } else {
      gsap.fromTo(
        "#sort_dropdown",
        {
          top: 0,
          autoAlpha: 1,
        },
        {
          top: -10,
          autoAlpha: 0,
          duration: 0.1,
          ease: "Sine.easeInOut",
          onStart: () => {
            sortDropdown.classList.toggle("invisible");
          },
        }
      );
    }
  };

  return (
    <>
      <div
        id="filter-bar"
        className="flex flex-row justify-between bg-white py-6 z-40 -mb-16"
      >
        <div>
          <p className="text-lg">
            Showing
            <span className="mx-1">
              {count === 12 ? "1-12" : `${count - length + 1}-${count}`}
            </span>
            of
            <span className="mx-1">
              {total.data ? total.data.count : <></>}
            </span>
          </p>
        </div>
        <div className="flex flex-row">
          <Button className="normal-case text-lg text-black z-50">
            Hide Filter
          </Button>
          <div id="sort" className="relative">
            <Button
              className="normal-case text-lg text-black z-50"
              onClick={() => sortByFunction()}
            >
              Sort By <IoIosArrowDown id="sort_icon" className="ml-2 ease-in" />
            </Button>
            <div
              id="sort_dropdown"
              className="w-44 h-44 px-4 invisible absolute -bottom-96 right-0 flex flex-col items-center bg-white z-40"
            >
              <p className="text-lg">Price: Low-High</p>
              <p className="text-lg">Price: High-Low</p>
              <p className="text-lg">Test</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
