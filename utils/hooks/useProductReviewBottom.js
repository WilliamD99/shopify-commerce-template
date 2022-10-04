import { useMutation } from "@tanstack/react-query";
import { productReviewsBottom } from "../api/requests";

let useProductReviewBottom = () => {
  let mutation = useMutation(async (params) => {
    let data = await productReviewsBottom(params);
    return data.data;
  });
  return mutation;
};

export default useProductReviewBottom;
