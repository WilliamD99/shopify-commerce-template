import React from "react";
import { useQueries } from "@tanstack/react-query";
import { productInCollection } from "../utils/api/requests";

import Slider from "../components/Home/Slider";

export default function Index() {
  const [open, setOpen] = React.useState(false)
  const sliderData = useQueries({
    queries: [
      {
        queryKey: ["collection", "price-drop"],
        queryFn: () => productInCollection({ handle: "price-drop", limit: 7 }),
        staleTime: 1000 * 60 * 60 * 12,
      },
    ],
  });
  console.log(open)

  return (
    <>
      <p onClick={() => setOpen(!open)}>Test</p>
      {/* <Slider data={sliderData[0]} title="Disposable" /> */}
    </>
  );
}
