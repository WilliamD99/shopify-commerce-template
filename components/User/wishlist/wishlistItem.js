import React, { useEffect } from "react";

import useProductById from "../../../utils/hooks/useProductById";

export default function WishlistItem({ id }) {
  let product = useProductById();

  useEffect(() => {
    product.mutate({ id: id });
  }, []);

  useEffect(() => {
    if (product.data) console.log(product.data);
  }, [product.data]);

  if (product.isIdle) return <></>;
  if (product.isLoading) return <p>Loading</p>;

  return (
    <>
      <div>{product.data.product.title}</div>
    </>
  );
}
