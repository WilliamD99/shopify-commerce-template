import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/router";

export default function Navigator({ data }) {
  const [navIndex, setNavIndex] = useState(-1);
  const [searchEnable, setSearchEnable] = useState(false);
  const router = useRouter();

  const handleNavClick = (index, handle) => {
    setNavIndex(index);
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

  return (
    <>
      <div
        id="blog-selector"
        className="absolute w-11/12 bottom-5 px-5 py-3 rounded-full z-40 flex flex-row"
      >
        <div
          className={`${
            navIndex === -1 ? "selected" : ""
          } px-4 py-3 rounded-3xl cursor-pointer blog-navigator`}
          onClick={() => handleNavClick(-1, "")}
        >
          <p>All</p>
        </div>
        {data.blogs.edges.map((e, i) => (
          <div
            key={`nav-${i}`}
            className={`${
              navIndex === i ? "selected" : ""
            } px-4 py-3 rounded-3xl cursor-pointer blog-navigator`}
            onClick={() => handleNavClick(i, e.node.title)}
          >
            <p>{e.node.title}</p>
          </div>
        ))}
        <div className="absolute right-8 top-1/2 -translate-y-1/2">
          <FiSearch className="text-white text-2xl" />
        </div>
      </div>
      {/* <div className="absolute backdrop-blur-3xl w-11/12 bottom-5 px-5 py-3 rounded-full z-50 flex flex-row">
        <div className="py-3">
          <p>Test</p>
        </div>
      </div> */}
    </>
  );
}
