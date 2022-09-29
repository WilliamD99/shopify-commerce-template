import { bd_post_loyalty } from "../api/requests";
import { useMutation } from "@tanstack/react-query";

let useLoyaltyBdPost = () => {
  let mutation = useMutation(async (params) => {
    let data = await bd_post_loyalty(params);
    return data;
  });
  return mutation;
};

export default useLoyaltyBdPost;
