import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import { MdExpandMore } from "react-icons/md";
import { NextSeo } from "next-seo";

export default function FAQ() {
  return (
    <>
      <NextSeo title="FAQ" description="" />
      <div className="mt-20 flex flex-col items-center px-20 space-y-10">
        <p className="text-center text-3xl font-bold">
          Frequently Asked Questions
        </p>
        <div className="w-1/2">
          <Accordion className="shadow-none">
            <AccordionSummary
              expandIcon={<MdExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className="shadow-none">
            <AccordionSummary
              expandIcon={<MdExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
}
