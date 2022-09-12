import { useMutation } from "@tanstack/react-query";
import { productById } from "../api/requests";

let useProductById = () => {
  let mutation = useMutation(async (params) => {
    let data = await productById(params);
    return data.data;
  });
  return mutation;
};

export default useProductById;
