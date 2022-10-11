import { productInCollection } from "../api/requests";
import { useMutation } from "@tanstack/react-query";

let useProductByCollection = () => {
  let mutation = useMutation(async (params) => {
    let data = await productInCollection(params);
    return data.data;
  });
  return mutation;
};

export default useProductByCollection;
