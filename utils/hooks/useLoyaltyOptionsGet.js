import { redemption_get_loyalty } from "../api/requests";
import { useMutation } from "@tanstack/react-query";

let useLoyaltyOptionsGet = () => {
  let mutation = useMutation(async (params) => {
    let data = await redemption_get_loyalty(params);
    return data;
  });
  return mutation;
};

export default useLoyaltyOptionsGet;
