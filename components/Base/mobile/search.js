import React, { useState, useRef, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { productSearchTemp } from "../../../lib/serverRequest";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { FiSearch } from "react-icons/fi";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Image from "../../common/Image";
import Link from "../../common/Link";
import Skeleton from "@mui/material/Skeleton";
import { formatter } from "../../../utils/utils";

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

  const { data, isSuccess, isLoading, isStale } = useQuery(
    [`search-${term}`],
    () =>
      productSearchTemp({
        number: NUMBER,
        search: term,
      }),
    { enabled: Boolean(term || term === ""), staleTime: 10000 * 100 }
  );
  console.log(data);

  let handlePriceDisplay = (e) => {
    let displayPrice;
    console.log(e);
    if (
      parseFloat(e.priceRangeV2.maxVariantPrice.amount) ===
      parseFloat(e.priceRangeV2.minVariantPrice.amount)
    ) {
      displayPrice = formatter.format(e.priceRangeV2.maxVariantPrice.amount);
    } else {
      displayPrice = `${formatter.format(
        e.priceRangeV2.minVariantPrice.amount
      )} - ${formatter.format(e.priceRangeV2.maxVariantPrice.amount)}`;
    }
    return displayPrice;
  };

  // let handlePriceDisplay = (e) => {
  //   let display;

  //   // if (displayPrice === 0) {
  //     if (
  //       parseFloat(e.priceRange.maxVariantPrice.amount) ===
  //       parseFloat(e.priceRange.minVariantPrice.amount)
  //     ) {
  //       display = formatter.format(e.priceRange.maxVariantPrice.amount);
  //     } else {
  //       display = `${formatter.format(
  //         e.priceRange.minVariantPrice.amount
  //       )} - ${formatter.format(e.priceRange.maxVariantPrice.amount)}`;
  //     }
  //   }

  //   return display;
  // };

  let search = useCallback(async (term) => {
    if (term === "") {
    } else {
      setTerm(term);
    }
  }, []);

  let debouncedSearch = useRef(
    debounce((term) => {
      search(term);
    }, 1000)
  ).current;

  let handleChangeInput = useCallback((e) => {
    debouncedSearch(e.target.value);
  }, []);

  const handleDisplaySearch = () => {
    if (isLoading && searchData.length > 0)
      return (
        <div className="grid grid-cols-2 gap-2">
          {[0, 0, 0, 0].map((e, i) => (
            <div key={i} className="flex flex-col space-y-5">
              <Skeleton variant="rectangular" className="w-full h-32" />
              <Skeleton />
              <Skeleton className="w-1/2" />
            </div>
          ))}
        </div>
      );
    else if (data && !isStale)
      return (
        <div className="grid grid-cols-2 gap-2">
          {searchData.map((e, i) => (
            <Link
              href={`/product/${e.node.handle}`}
              className="flex flex-col space-y-5"
              key={i}
            >
              <div className="relative h-32 w-full">
                <Image
                  src={e.node.featuredImage.url}
                  layout="fill"
                  alt={e.node.title}
                  placeholder="blur"
                  blurDataURL="/placeholder.webp"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <p>{e.node.title}</p>
                <p className="text-sm">{handlePriceDisplay(e.node)}</p>
              </div>
            </Link>
          ))}
        </div>
      );
    else return <></>;
  };

  const handleLinkSuggestion = (e) => {
    setTerm(e);
  };

  useEffect(() => {
    if (!isLoading && isSuccess && data) {
      setSearchData(data.data.products.edges);
    }
  }, [data]);

  useEffect(() => {
    if (open) setOpen(false);
  }, [routerQuery]);

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
              <p onClick={() => handleLinkSuggestion("allo")}>Allo</p>{" "}
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
