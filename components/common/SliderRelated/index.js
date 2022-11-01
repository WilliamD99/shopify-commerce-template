import React, { useContext } from "react";
import deviceContext from "../../../utils/deviceContext";
import dynamic from "next/dynamic";

import { useQueries } from "@tanstack/react-query";
import { productById } from "../../../lib/serverRequest";


const SliderDesktop = dynamic(() => import("./desktop"));
const SliderMobile = dynamic(() => import("./mobile"));

export default function SliderIndex({ data, title }) {
  const { isMobile } = useContext(deviceContext);
  // data = [
  //   "gid://shopify/Product/7289148735668",
  //   "gid://shopify/Product/7288095244468",
  // ]
  // const 
  let queryFunctions = data.map(e => {
    return {
      queryKey: ['related', e], queryFn: () => productById({ id: e }), staleTime: 1000 * 60 * 60 * 12, enabled: Boolean(data)
    }
  })
  const results = useQueries({
    queries: queryFunctions
  })

  return (
    <>
      {isMobile ? (
        <SliderMobile data={results} title={title} />
      ) : (
        <SliderDesktop data={results} title={title} />
      )}
    </>
  )
}