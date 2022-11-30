import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import SearchDrawer from "./SearchDrawer";
import { useRouter } from "next/router";

export default function Index() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const toggle = () => {
    setOpen(!open);
    if (typeof window != "undefined" && window.document) {
      document.querySelector("html").classList.toggle("overflow-hidden");
    }
  };

  useEffect(() => {
    setOpen(false);
  }, [router.query]);

  return (
    <>
      <FiSearch
        className="cursor-pointer text-white text-2xl hover:opacity-80"
        onClick={toggle}
      />
      <SearchDrawer open={open} setOpen={toggle} />
    </>
  );
}
