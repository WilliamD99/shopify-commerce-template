import { checkoutToCustomer } from "../api/requests";
import { useMutation } from "@tanstack/react-query";

let useCheckoutToCustomer = () => {
  let mutation = useMutation(async (params) => {
    let data = await checkoutToCustomer(params);
    return data.data;
  });
  return mutation;
};

export default useCheckoutToCustomer;
