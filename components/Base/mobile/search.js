import React, { useState, useRef, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { productSearchTemp } from "../../../lib/serverRequest";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { FiSearch } from "react-icons/fi";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AiOutlineClose } from "react-icons/ai";
import Image from "../../common/Image";
import Link from "../../common/Link";

const NUMBER = 5;

export default function Search() {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState();
  const [searchData, setSearchData] = useState([]);
  const router = useRouter();
  const routerQuery = router.query;

  const toggleDrawer = (e, open) => {
    if ((e.type === "keydown" && e.key === "Tab") || e.key === "Shift") {
      return;
    }
    setOpen(open);
  };

  const { data, isSuccess, isLoading, isPaused, isStale } = useQuery(
    [`search-${term}`],
    () =>
      productSearchTemp({
        number: NUMBER,
        search: term,
      }),
    { enabled: Boolean(term || term === ""), staleTime: 10000 * 100 }
  );
  console.log(data);

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

  const handleDisplaySearch = () => {
    if (isLoading && !isStale) return <p>Loading</p>;
    else if (!isLoading && !data) return <p>No Data</p>;
    else if (isStale) return <></>;
    else
      return (
        <div className="grid grid-cols-2 gap-x-2">
          {searchData.map((e, i) => (
            <div className="flex flex-col space-y-3" key={i}>
              <div className="relative h-32 w-full">
                <Image
                  src={e.node.featuredImage.url}
                  layout="fill"
                  alt={e.node.title}
                />
              </div>
              <Link href={`/product/${e.node.handle}`}>{e.node.title}</Link>
            </div>
          ))}
        </div>
      );
  };

  useEffect(() => {
    if (!isLoading && isSuccess && data) {
      setSearchData(data.data.products.edges);
    }
  }, [data]);

  // useEffect(() => {
  //   if (open) setOpen(false);
  // }, [routerQuery]);

  return (
    <>
      <FiSearch className="text-2xl" onClick={() => setOpen(true)} />
      <Drawer anchor="top" open={open} onClose={() => toggleDrawer(false)}>
        <Box id="header-drawer__mobile" className="w-screen h-screen py-5 px-5">
          <div className="flex flex-row items-center space-x-10 mb-10">
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
          <div className="mb-10 px-3 flex flex-col space-y-3">
            <p className="text-gray-500">Top Suggestion</p>
            <div className="flex flex-col space-y-1">
              <Link href="#">Allo</Link>
              <Link href="#">Hooti</Link>
              <Link href="#">Vssx</Link>
            </div>
          </div>
          {handleDisplaySearch()}
        </Box>
      </Drawer>
    </>
  );
}
