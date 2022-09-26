import { vendorGet } from "../api/requests";
import { useMutation } from "@tanstack/react-query";

const useVendorGet = () => {
  let mutation = useMutation(async () => {
    let data = await vendorGet();
    return data.data;
  });
  return mutation;
};

export default useVendorGet;
