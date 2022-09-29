import { redemption_post_loyalty } from "../api/requests";
import { useMutation } from "@tanstack/react-query";

let useLoyaltyOptionPost = () => {
  let mutation = useMutation(async (params) => {
    let data = await redemption_post_loyalty(params);
    return data;
  });
  return mutation;
};

export default useLoyaltyOptionPost;
