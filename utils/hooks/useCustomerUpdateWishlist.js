import { customerUpdateWishlist } from "../api/requests";
import { useMutation } from "@tanstack/react-query";

let useCustomerUpdateWishlist = () => {
  let mutation = useMutation(async (params) => {
    let data = await customerUpdateWishlist(params);
    return data.data;
  });
  return mutation;
};

export default useCustomerUpdateWishlist;
