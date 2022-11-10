import React, { useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdExpandMore } from "react-icons/md";
import Rating from "@mui/material/Rating";
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'

import { useQuery } from "@tanstack/react-query";
import { productReviews } from "../../../utils/api/requests";

import ReviewForm from "./reviewForm";
import he from "he";


export default function ProductAccordion({ id, description, title }) {
  const { data } = useQuery(["product_review", id], () => productReviews({ id: id }), { staleTime: 24 * 60 * 60 * 1000 })
  console.log(data)
  const handleDisplayReviews = () => {
    if (data) {
      if (data.status.code === 200) {
        if (data.response.reviews.length === 0) {
          return <>
            <p>Be the first one to write the review</p>
            <p className="mt-5 text-lg">Write a review for this product</p>
            <ReviewForm productTitle={title} id={id} />
          </>
        } else {
          return (
            <>
              {data.response.reviews.map((e, i) => (
                <div className="flex flex-col space-y-2 border-b-2 py-2" key={`review-${i}`}>
                  <div className="flex flex-row justify-between">
                    <Rating value={e.score} precision={0.1} />
                    <div className="flex flex-row items-end space-x-2">
                      <AiOutlineLike />
                      <AiOutlineDislike />
                    </div>
                  </div>
                  <p className="font-medium">{e.user.display_name} - <span className="font-normal">{new Date(e.created_at).toLocaleDateString()}</span></p>
                  <p>{he.decode(e.content)}</p>
                </div>
              ))}
              <div className="flex flex-col space-y-2 mt-5">
                <p className="mt-5 text-lg">Write a review for this product</p>
                <ReviewForm productTitle={title} id={id} />
              </div>
            </>
          )
        }
      } else {
        return <></>
      }
    } else {
      return <></>
    }
  }


  return (
    <>
      <div id="product-accordion" className="flex flex-col space-y-0 pt-5">
        <Accordion disableGutters={true} className="shadow-none">
          <AccordionSummary
            expandIcon={<MdExpandMore className="text-2xl" />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className="bg-slate-100 shadow-none pl-0"
          >
            <p className="text-base uppercase md:text-xl font-semibold">
              Details
            </p>
          </AccordionSummary>
          <AccordionDetails>
            <div
              className="product-description"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
          </AccordionDetails>
        </Accordion>
        <Accordion disableGutters={true} className="shadow-none">
          <AccordionSummary
            expandIcon={<MdExpandMore className="text-2xl" />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className="bg-slate-100 shadow-none pl-0"
          >
            <p className="text-base uppercase md:text-xl font-semibold">
              Return Policy
            </p>
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
          <AccordionSummary className="bg-slate-100 shadow-none pl-0">
            <div className="flex flex-row justify-between items-center w-full">
              <p className="text-base uppercase md:text-xl font-semibold">
                Reviews
                {data ? (
                  <span className="ml-1">
                    {`(${data.response.bottomline.total_review})`}
                  </span>
                ) : (
                  <></>
                )}
              </p>
              {data ? (
                data.response.bottomline.average_score > 0 ? (
                  <Rating
                    readOnly
                    value={data.response.bottomline.average_score}
                    precision={0.1}
                  />
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </div>
          </AccordionSummary>
          <AccordionDetails className="flex flex-col space-y-3">
            {
              handleDisplayReviews()
            }
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
