import React, { useState, useRef, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { productSearchTemp } from "../../../lib/serverRequest";
import { useQuery } from "@tanstack/react-query";

import { FiSearch } from "react-icons/fi";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AiOutlineClose } from "react-icons/ai";

const NUMBER = 5;

export default function Search() {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState();
  const [searchData, setSearchData] = useState([]);

  const toggleDrawer = (e, open) => {
    if ((e.type === "keydown" && e.key === "Tab") || e.key === "Shift") {
      return;
    }
    setOpen(open);
  };

  const { data, isSuccess, isLoading } = useQuery(
    [`search-${term}`],
    () =>
      productSearchTemp({
        number: NUMBER,
        search: term,
      }),
    { enabled: Boolean(term || term === ""), staleTime: 10000 * 100 }
  );

  let search = useCallback(async (term) => {
    if (term === "") {
    } else {
      setTerm(term);
    }
  }, []);

  let debouncedSearch = useRef(
    debounce((term) => {
      search(term);
    }, 500)
  ).current;

  let handleChangeInput = useCallback((e) => {
    debouncedSearch(e.target.value);
  }, []);

  useEffect(() => {
    if (!isLoading && isSuccess && data) {
      setSearchData(data.data.products.edges);
    }
  }, [data]);

  return (
    <>
      <FiSearch className="text-2xl" onClick={() => setOpen(true)} />
      <Drawer anchor="top" open={open} onClose={() => toggleDrawer(false)}>
        <Box className="w-screen h-screen py-5 px-5">
          <div className="flex flex-row items-center space-x-10">
            <TextField
              className="rounded-2xl"
              size="small"
              type="text"
              placeholder="Search ..."
              onChange={handleChangeInput}
            />
            <p className="cursor-pointer" onClick={() => setOpen(false)}>
              Cancel
            </p>
          </div>
          {searchData.length > 0 && isSuccess && !isLoading ? (
            <>
              {searchData.map((e, i) => (
                <p key={i}>{e.node.title}</p>
              ))}
            </>
          ) : (
            <></>
          )}
        </Box>
      </Drawer>
    </>
  );
}
