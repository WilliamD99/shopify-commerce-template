import React, { useEffect, useContext } from "react";
import Rating from "@mui/material/Rating";
import { BiUserCheck } from "react-icons/bi";
import Slider from "react-slick";

import useProductGetReviews from "../../../utils/hooks/useProductGetReviews";
import he from "he";
import deviceContext from "../../../utils/deviceContext";

export default function Index({ id }) {
  const productReviews = useProductGetReviews();
  const { isMobile } = useContext(deviceContext);

  useEffect(() => {
    productReviews.mutate({ id: id });
  }, []);

  // useEffect(() => {
  //   if (productReviews.data) console.log(productReviews.data);
  // }, [productReviews.data]);
  let settings = {
    infinite: true,
    arrows: true,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: isMobile ? 1 : 3,
    swipeToSlide: true,
  };

  if (!productReviews.data) return <></>;

  return (
    <div id="reviews">
      <div className="flex flex-row items-center space-x-4">
        <p className="text-5xl font-semibold">
          {productReviews.data.response.bottomline.average_score.toFixed(2)}
        </p>
        <div className="flex flex-col space-y-1">
          <Rating
            readOnly
            value={parseFloat(
              productReviews.data.response.bottomline.average_score.toFixed(2)
            )}
            precision={0.1}
          />
          <p className="font-medium">
            {productReviews.data.response.bottomline.total_review} reviews
          </p>
        </div>
      </div>
      <Slider {...settings} className="mt-10">
        {productReviews.data.response.reviews.map((e, i) => (
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
  );
}
