import { orderGet } from "../api/requests";
import { useMutation } from "@tanstack/react-query";

let useOrderGet = () => {
  let mutation = useMutation(async (params) => {
    let data = await orderGet(params);
    return data.data;
  });
  return mutation;
};

export default useOrderGet;
