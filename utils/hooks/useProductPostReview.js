import { useMutation } from "@tanstack/react-query";
import { productReviewsPost } from "../api/requests";

let useProductPostReviews = () => {
  let mutation = useMutation(async (params) => {
    let data = await productReviewsPost(params);
    return data.data;
  });
  return mutation;
};

export default useProductPostReviews;
