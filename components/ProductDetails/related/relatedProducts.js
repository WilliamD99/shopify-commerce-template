import React from "react";
import Product from "./relatedProduct";

export default function Related({ data }) {
  data = JSON.parse(data.value);

  return (
    <>
      <div className="flex flex-row justify-center space-x-5 mt-10">
        {data.map((e) => (
          <Product key={e} data={e} />
        ))}
      </div>
    </>
  );
}
