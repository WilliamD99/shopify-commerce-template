import React, { useEffect, useState } from "react";

import useProductById from "../../../utils/hooks/useProductById";

import Loading from "../../Loading/dataLoading";
import Image from "../../common/Image";
import Link from "../../common/Link";

export default function Product({ data }) {
  let [productData, setProductData] = useState();
  let productHook = useProductById();

  useEffect(() => {
    productHook.mutate({ id: data });
  }, []);

  useEffect(() => {
    if (productHook.data) setProductData(productHook.data.product);
  }, [productHook.isLoading]);

  console.log(productData);

  if (productHook.isLoading || !productData) return <Loading />;

  return (
    <>
      <div className="xl:h-96 xl:w-96 flex flex-col space-y-5 bg-slate-100">
        <div className="image-container relative w-full h-56 xl:h-64">
          <Image
            alt={productData.title}
            src={productData.featuredImage.url}
            layout="fill"
            placeholder="blur"
            blurDataURL="https://prohygiene.com/usa/wp-content/uploads/sites/18/2015/12/placeholder.gif"
          />
        </div>
        <div className="px-5">
          <Link href={`/product/${productData.handle}`} className="text-lg">
            {productData.title}
          </Link>
        </div>
      </div>
    </>
  );
}
