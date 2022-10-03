import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdExpandMore } from "react-icons/md";
import Divider from "@mui/material/Divider";

export default function ProductAccordion() {
  return (
    <>
      <div id="product-accordion" className="flex flex-col space-y-0">
        <Accordion disableGutters={true} className="shadow-none">
          <AccordionSummary
            expandIcon={<MdExpandMore className="text-2xl" />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className="bg-amber-50 shadow-none pl-0"
          >
            <p className="text-xl font-semibold">Details</p>
          </AccordionSummary>
          <AccordionDetails>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion disableGutters={true} className="shadow-none">
          <AccordionSummary
            expandIcon={<MdExpandMore className="text-2xl" />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className="bg-amber-50 shadow-none pl-0"
          >
            <p className="text-xl font-semibold">Return Policy</p>
          </AccordionSummary>
          <AccordionDetails>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion disableGutters={true} className="shadow-none">
          <AccordionSummary
            expandIcon={<MdExpandMore className="text-2xl" />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className="bg-amber-50 shadow-none pl-0"
          >
            <p className="text-xl font-semibold">Reviews</p>
          </AccordionSummary>
          <AccordionDetails>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </p>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
