import React, { useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdExpandMore } from "react-icons/md";
import Rating from "@mui/material/Rating";

import useProductReviewBottom from "../../../utils/hooks/useProductReviewBottom";

export default function ProductAccordion({ id }) {
  const reviewBottom = useProductReviewBottom();

  useEffect(() => {
    reviewBottom.mutate({ id: id });
  }, []);

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
          <AccordionSummary className="bg-amber-50 shadow-none pl-0">
            <div className="flex flex-row justify-between items-center w-full">
              <p className="text-xl font-semibold">
                Reviews
                {reviewBottom.data ? (
                  <span className="ml-1">
                    ({reviewBottom.data.response.bottomline.total_reviews})
                  </span>
                ) : (
                  <></>
                )}
              </p>
              {reviewBottom.data ? reviewBottom.data.response.bottomline.average_score > 0 ? (
                <Rating
                  readOnly
                  value={reviewBottom.data.response.bottomline.average_score}
                />
              ) : <></> : (
                <></>
              )}
            </div>
          </AccordionSummary>
        </Accordion>
      </div>
    </>
  );
}