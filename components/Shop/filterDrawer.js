import React, { useState } from "react";
import { BsFilterRight } from "react-icons/bs";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdExpandMore } from "react-icons/md";
import Slider from "@mui/material/Slider";

export default function FilterDrawer({ vendors, types, collections }) {
  const [drawerOpen, setDrawer] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const toggleDrawer = (e, open) => {
    if ((e.type === "keydown" && e.key === "Tab") || e.key === "Shift") {
      return;
    }
    setDrawer(open);
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
          id="filter-drawer"
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
                  {collections.map((e) => (
                    <p>{e.node.title}</p>
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
                  {vendors.map((e) => (
                    <p key={`vendor-${e.node}`}>{e.node}</p>
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
                  {types.map((e) => (
                    <p>{e.node}</p>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>

            <Accordion
              disableGutters={true}
              className="shadow-none"
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
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
                <Slider
                  getAriaLabel={() => "Price range"}
                  value={0}
                  // onChange={handleChange}
                  valueLabelDisplay="auto"
                  disableSwap
                  min={0}
                  max={1000}
                  step={10}
                />
              </AccordionDetails>
            </Accordion>
            <div className="flex flex-row justify-between mt-3">
              <p className="text-base uppercase md:text-xl font-semibold">
                Test
              </p>
              <p>Test</p>
            </div>
          </div>
        </Box>
      </Drawer>
    </div>
  );
}
