import React, { useEffect } from "react";
import Rating from "@mui/material/Rating";
import { BiUserCheck } from "react-icons/bi";

import useProductGetReviews from "../../../utils/hooks/useProductGetReviews";
import he from "he";

export default function Index({ id }) {
  const productReviews = useProductGetReviews();

  useEffect(() => {
    productReviews.mutate({ id: id });
  }, []);

  useEffect(() => {
    if (productReviews.data) console.log(productReviews.data);
  }, [productReviews.data]);

  if (!productReviews.data) return <></>;

  return (
    <>
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
      <div className="flex flex-row space-x-5 mt-8">
        {productReviews.data.response.reviews.map((e, i) => (
          <div
            className="relative bg-slate-50 px-4 py-4 w-72 h-64 flex flex-col justify-between rounded-md shadow-2xl"
            key={i}
          >
            <div className="absolute bg-slate-50 drop-shadow-2xl flex justify-center items-center rounded-md px-2 py-1 top-0 left-1/2 -translate-y-1/2 -translate-x-1/2">
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
            <p className="text-right font-medium">
              {new Date(e.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
