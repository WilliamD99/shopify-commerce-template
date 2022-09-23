import { productSearch } from "../api/requests";
import { useMutation } from "@tanstack/react-query";

const useProductSearch = () => {
  let mutation = useMutation(async (params) => {
    let data = await productSearch(params);
    return data.data;
  });
  return mutation;
};

export default useProductSearch;
