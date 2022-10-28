import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { collectionGet } from "../../lib/serverRequest";

import Link from "../common/Link";
import PriceFilter from "./filter/price";
import VendorFilter from "./filter/vendor";
import ProductType from "./filter/product-type";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdExpandMore } from "react-icons/md";

export default function FilterMenu() {
  let [price, setPrice] = useState([0, 1000]);
  let router = useRouter();
  let routerQuery = router.query;

  const { data } = useQuery(["collections-all"], collectionGet, {
    staleTime: 24 * 60 * 60 * 1000,
  });

  return (
    <>
      <div
        id="filter"
        className="filter-menu hidden md:block overflow-scroll pl-2 overflow-x-hidden sb-custom w-3/12 xl:w-2/12 bg-slate-50 py-5"
      >
        <Accordion
          defaultExpanded={true}
          disableGutters={true}
          className="shadow-none bg-slate-50"
        >
          <AccordionSummary expandIcon={<MdExpandMore className="text-2xl" />}>
            <p className="text-lg font-semibold">Category</p>
          </AccordionSummary>
          <AccordionDetails>
            <div className="relative sb-custom h-full flex flex-col space-y-2 overflow-scroll overflow-x-hidden pl-2">
              {data.data.collections.edges.map((e) => (
                <div
                  key={e.node.handle}
                  className="flex flex-row justify-between items-center"
                >
                  <Link
                    className={`${
                      decodeURIComponent(
                        routerQuery["products-in-collection"]
                      ) === e.node.handle
                        ? "font-semibold"
                        : ""
                    }`}
                    href={{
                      pathname: `/shop/${e.node.handle}`,
                      // query: { col: encodeURIComponent(e.node.handle) },
                    }}
                  >
                    {e.node.title}
                  </Link>
                  <p className="text-xs opacity-70 font-semibold">
                    {e.node.productsCount}
                  </p>
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion
          id="price-filter"
          disableGutters={true}
          defaultExpanded={true}
          className="shadow-none bg-slate-50"
        >
          <AccordionSummary expandIcon={<MdExpandMore className="text-2xl" />}>
            <p className="text-lg font-semibold">
              Price
              {price[0] === 0 && price[1] === 1000 ? (
                <></>
              ) : (
                <span className="ml-2">
                  <span className="font-normal text-base">${price[0]}</span> -{" "}
                  <span className="font-normal text-base">${price[1]}</span>
                </span>
              )}
            </p>
          </AccordionSummary>
          <AccordionDetails>
            <PriceFilter price={price} setPrice={setPrice} />
          </AccordionDetails>
        </Accordion>

        <Accordion
          defaultExpanded={true}
          disableGutters={true}
          id="vendor-filter"
          className="shadow-none bg-slate-50"
        >
          <AccordionSummary expandIcon={<MdExpandMore className="text-2xl" />}>
            <p className="text-lg font-semibold">Vendor</p>
          </AccordionSummary>
          <AccordionDetails>
            <VendorFilter />
          </AccordionDetails>
        </Accordion>

        <Accordion
          disableGutters={true}
          defaultExpanded={true}
          id="product-type-filter"
          className="shadow-none bg-slate-50"
        >
          <AccordionSummary expandIcon={<MdExpandMore className="text-2xl" />}>
            <p className="text-lg font-semibold">Type</p>
          </AccordionSummary>
          <AccordionDetails>
            <ProductType />
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
