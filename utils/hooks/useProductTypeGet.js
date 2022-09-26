import { productTypeGet } from "../api/requests";
import { useMutation } from "@tanstack/react-query";

const useProductTypeGet = () => {
  let mutation = useMutation(async () => {
    let data = await productTypeGet();
    return data.data;
  });
  return mutation;
};

export default useProductTypeGet;
