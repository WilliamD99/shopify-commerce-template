import { productInCollection } from "../api/requests";
import { useMutation } from "@tanstack/react-query";

let useProductByCollection = () => {
  let mutation = useMutation(async (params) => {
    let data = await productInCollection({
      id: params.id,
      cursor: params.cursor,
      direction: params.direction,
      sortKey: params.sortKey,
      reverse: params.reverse,
      price: params.price,
      sales: params.sales,
      vendors: params.vendors,
    });
    return data.data;
  });
  return mutation;
};

export default useProductByCollection;
