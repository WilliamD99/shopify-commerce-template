import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/router";

import Search from "../search";

export default function Navigator({ data }) {
  const [navIndex, setNavIndex] = useState(-1);
  const [searchEnable, setSearchEnable] = useState(false);
  const router = useRouter();
  const routerQuery = router.query

  const handleNavClick = (index, handle) => {
    if (index === -1) {
      setNavIndex(index);
    }
    if (handle !== "") {
      router.push(
        {
          pathname: "/blogs",
          query: { name: encodeURIComponent(handle) },
        },
        undefined,
        { scroll: false }
      );
    } else {
      router.push("/blogs", undefined, { scroll: false });
    }
  };

  useEffect(() => {
    let currentName = decodeURIComponent(routerQuery.name)
    data.blogs.edges.map((e, i) => {
      if (currentName === e.node.title) {
        setNavIndex(i)
      }
    })

  }, [routerQuery])

  return (
    <>
      <div
        id="blog-selector"
        className="absolute w-11/12 bottom-5 px-2 lg:px-5 rounded-full z-40 flex flex-row h-16 items-center"
      >
        <div
          className={`${navIndex === -1 ? "selected" : ""
            } px-4 py-3 rounded-3xl cursor-pointer blog-navigator`}
          onClick={() => handleNavClick(-1, "")}
        >
          <p>All</p>
        </div>
        <div className="flex flex-row items-center overflow-x-scroll lg:overflow-x-hidden overflow-hidden w-auto">
          {data.blogs.edges.map((e, i) => (
            <div
              key={`nav-${i}`}
              className={`${navIndex === i ? "selected pointer-events-none" : ""
                } px-4 py-3 rounded-3xl cursor-pointer blog-navigator`}
              onClick={() => handleNavClick(i, e.node.title)}
            >
              <p className="text-sm lg:text-base whitespace-nowrap">{e.node.title}</p>
            </div>
          ))}
        </div>
        <div className="absolute hidden lg:block right-8 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setSearchEnable(true)}>
          <FiSearch className="text-white text-2xl" />
        </div>
      </div>
      <Search open={searchEnable} setOpen={setSearchEnable} />
    </>
  );
}
