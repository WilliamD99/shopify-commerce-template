import { customer_get_loyalty } from "../api/requests";
import { useMutation } from "@tanstack/react-query";

let useLoyaltyGetCustomer = () => {
  let mutation = useMutation(async (params) => {
    let data = await customer_get_loyalty(params);
    return data;
  });
  return mutation;
};

export default useLoyaltyGetCustomer;
