import React, { useState } from "react";
import { BsFilterRight } from "react-icons/bs";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdExpandMore } from "react-icons/md";
import Link from "../common/Link";
import PriceFilter from "./filter/price";

import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import {
  vendorsGet,
  productTypeGet,
  collectionGet,
} from "../../lib/serverRequest";

export default function FilterDrawer() {
  let router = useRouter();
  let routerQuery = router.query;
  const [drawerOpen, setDrawer] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [price, setPrice] = useState([0, 1000]);
  let [selectedVendors, setSelectedVendors] = useState(
    typeof document !== "undefined" ? decodeURIComponent(routerQuery.vendors).split(",") : []
  );
  let [selectedTypes, setSelectedType] = useState(
    typeof document !== "undefined" ? decodeURIComponent(routerQuery.type).split(",") : []
  );

  const getVendors = useQuery(["vendors-all"], vendorsGet, {
    staleTime: 24 * 60 * 60 * 1000,
  });
  const getTypes = useQuery(["types-all"], productTypeGet, {
    staleTime: 24 * 60 * 60 * 1000,
  });
  const getCollections = useQuery(["collections-all"], collectionGet, {
    staleTime: 24 * 60 * 60 * 1000,
  });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const toggleDrawer = (e, open) => {
    if ((e.type === "keydown" && e.key === "Tab") || e.key === "Shift") {
      return;
    }
    setDrawer(open);
  };

  const handleVendor = (e) => {
    let newList;
    delete routerQuery["cursor"];
    delete routerQuery["direction"];
    delete routerQuery["reversed"];

    if (selectedVendors.includes(e)) {
      newList = selectedVendors.filter((selected) => selected !== e);

      setSelectedVendors(newList);
    } else {
      newList = selectedVendors;
      newList.push(e);
      setSelectedVendors(newList);
    }
    if (newList.length > 0) {
      routerQuery.vendors = encodeURIComponent(newList.join(","));
      router.push(
        {
          query: routerQuery,
        },
        undefined
      );
    } else {
      delete routerQuery.vendors;
      router.push(
        {
          query: routerQuery,
        },
        undefined
      );
    }
  };

  const handleType = (e) => {
    let newList;
    delete routerQuery["cursor"];
    delete routerQuery["direction"];
    delete routerQuery["reversed"];

    if (selectedTypes.includes(e)) {
      newList = selectedTypes.filter((selected) => selected !== e);

      setSelectedType(newList);
    } else {
      newList = selectedTypes;
      newList.push(e);
      setSelectedType(newList);
    }
    if (newList.length > 0) {
      routerQuery.type = encodeURIComponent(newList.join(","));
      router.push(
        {
          query: routerQuery,
        },
        undefined
      );
    } else {
      delete routerQuery.type;
      router.push(
        {
          query: routerQuery,
        },
        undefined
      );
    }
  };

  return (
    <div>
      <BsFilterRight
        onClick={() => setDrawer(!drawerOpen)}
        className="mr-5 text-2xl md:hidden"
      />
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Box
          id="filter"
          className="py-10 px-5 flex flex-col justify-between space-y-5"
        >
          <div>
            <Accordion
              disableGutters={true}
              className="shadow-none"
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<MdExpandMore className="text-2xl" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className="bg-white shadow-none pl-0"
              >
                <p className="text-base uppercase md:text-xl font-semibold">
                  Category
                </p>
              </AccordionSummary>
              <AccordionDetails>
                <div className="grid grid-cols-2 gap-4">
                  {getCollections.data.data.collections.edges.map((e) => (
                    <Link
                      href={{
                        pathname: `/shop/${e.node.handle}`,
                      }}
                      key={`category-${e.node.title}`}
                      className={
                        routerQuery["products-in-collection"] === e.node.handle
                          ? "font-bold"
                          : ""
                      }
                    >
                      {e.node.title}
                    </Link>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>

            <Accordion
              disableGutters={true}
              className="shadow-none"
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<MdExpandMore className="text-2xl" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className="bg-white shadow-none pl-0"
              >
                <p className="text-base uppercase md:text-xl font-semibold">
                  Vendor
                </p>
              </AccordionSummary>
              <AccordionDetails>
                <div className="grid grid-cols-2 gap-4">
                  {getVendors.data.data.shop.productVendors.edges.map((e) => (
                    <p
                      onClick={() => handleVendor(e.node)}
                      key={`vendor-${e.node}`}
                      className={`${decodeURIComponent(routerQuery.vendors)
                        .split(",")
                        .includes(e.node)
                        ? "font-bold"
                        : ""
                        }`}
                    >
                      {e.node}
                    </p>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>

            <Accordion
              disableGutters={true}
              className="shadow-none"
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                expandIcon={<MdExpandMore className="text-2xl" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className="bg-white shadow-none pl-0"
              >
                <p className="text-base uppercase md:text-xl font-semibold">
                  Product Type
                </p>
              </AccordionSummary>
              <AccordionDetails>
                <div className="grid grid-cols-2 gap-4">
                  {getTypes.data.data.productTypes.edges.map((e) => (
                    <p
                      onClick={() => handleType(e.node)}
                      key={`type-${e.node}`}
                      className={`${decodeURIComponent(routerQuery.type)
                        .split(",")
                        .includes(e.node)
                        ? "font-bold"
                        : ""
                        }`}
                    >
                      {e.node}
                    </p>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>

            <Accordion
              disableGutters={true}
              className="shadow-none"
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
              id="price-filter"
            >
              <AccordionSummary
                expandIcon={<MdExpandMore className="text-2xl" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className="bg-white shadow-none pl-0"
              >
                <p className="text-base uppercase md:text-xl font-semibold">
                  Price
                </p>
              </AccordionSummary>
              <AccordionDetails>
                <PriceFilter price={price} setPrice={setPrice} />
              </AccordionDetails>
            </Accordion>
          </div>
        </Box>
      </Drawer>
    </div>
  );
}
