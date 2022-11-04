import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import { BiUserCheck } from "react-icons/bi";
import Slider from "react-slick";

import he from "he";
import deviceContext from "../../../utils/deviceContext";
import { useQuery } from "@tanstack/react-query";
import { productReviews } from '../../../utils/api/requests'

export default function Index({ id }) {
  // const productReviews = useProductGetReviews();
  const { isMobile } = useContext(deviceContext);

  const { data } = useQuery(["product_review", id], () => productReviews({ id: id }), { staleTime: 24 * 60 * 60 * 1000 })

  let settings = {
    infinite: true,
    arrows: false,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: isMobile ? 1 : 3,
    swipeToSlide: true,
  };

  if (!data) return <></>;

  return (
    <>
      <div id="reviews">
        <div className="flex flex-row items-center space-x-4">
          <p className="text-5xl font-semibold">
            {data.response.bottomline.average_score.toFixed(2)}
          </p>
          <div className="flex flex-col space-y-1">
            <Rating
              readOnly
              value={parseFloat(
                data.response.bottomline.average_score.toFixed(2)
              )}
              precision={0.1}
            />
            <p className="font-medium">
              {data.response.bottomline.total_review} reviews
            </p>
          </div>
        </div>
        <Slider {...settings} className="mt-10">
          {data.response.reviews.map((e, i) => (
            <div
              className="relative px-4 py-4  h-64 flex flex-col justify-between rounded-md border-2"
              key={i}
            >
              <div className="absolute bg-slate-50 drop-shadow-2xl flex justify-center items-center rounded-md px-2 py-1 top-0 left-1/2 -translate-x-1/2">
                <Rating readOnly value={e.score} />
              </div>
              <div className="flex flex-col space-y-5">
                <p className="font-semibold text-base mt-5 flex flex-row items-center">
                  {e.user.display_name}
                  <BiUserCheck className="ml-2 text-2xl text-green-500" />
                </p>
                <div className="flex flex-col space-y-3 ml-2">
                  <p className="font-medium">{e.title}</p>
                  <p>{he.decode(e.content)}</p>
                </div>
              </div>
              <p className="text-left font-medium">
                {new Date(e.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
