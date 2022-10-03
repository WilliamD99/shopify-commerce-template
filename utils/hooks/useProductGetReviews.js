import { useMutation } from "@tanstack/react-query";
import { productReviews } from "../api/requests";

let useProductGetReviews = () => {
  let mutation = useMutation(async (params) => {
    let data = await productReviews(params);
    return data.data;
  });
  return mutation;
};

export default useProductGetReviews;
