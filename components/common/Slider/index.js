import React, { useContext } from "react";
import deviceContext from "../../../utils/deviceContext";
import dynamic from "next/dynamic";

import { useQueries } from "@tanstack/react-query";
import { productByHandleApiRoute, productById } from "../../../lib/serverRequest";


const SliderDesktop = dynamic(() => import("./desktop"));
const SliderMobile = dynamic(() => import("./mobile"));

export default function SliderIndex({ data, title, type }) {
  const { isMobile } = useContext(deviceContext);

  let queryFunctions = data.map(e => {
    if (type === "id")
      return {
        queryKey: [title, e], queryFn: () => productById({ id: e }), staleTime: 1000 * 60 * 60 * 12, enabled: Boolean(data)
      }
    else if (type === "handle")
      return {
        queryKey: [title, e], queryFn: () => productByHandleApiRoute({ handle: e }), staleTime: 1000 * 60 * 60 * 12, enabled: Boolean(data)
      }
  })

  const results = useQueries({
    queries: queryFunctions
  })

  return (
    <>
      {isMobile ? (
        <SliderMobile data={results} title={title} type={type} />
      ) : (
        <SliderDesktop data={results} title={title} type={type} />
      )}
    </>
  )
}