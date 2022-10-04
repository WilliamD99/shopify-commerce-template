import React, { useEffect } from "react";
import Rating from "@mui/material/Rating";

import useProductGetReviews from "../../../utils/hooks/useProductGetReviews";

export default function Index({ id }) {
  console.log(id);
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
          {productReviews.data.response.bottomline.average_score}
        </p>
        <div className="flex flex-col space-y-2">
          <Rating
            readOnly
            value={productReviews.data.response.bottomline.average_score}
          />
          <p className="font-medium">
            {productReviews.data.response.bottomline.total_review} reviews
          </p>
        </div>
      </div>
    </>
  );
}
