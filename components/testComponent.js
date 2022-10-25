import React from "react";
import { useQuery } from "@tanstack/react-query";
import { productAll } from "../utils/api/requests";

export default function TestComponent() {
  const { data } = useQuery(["vendors"], productAll, { staleTime: 10000 });
  console.log(data);
  return (
    <>
      <div>Test</div>
    </>
  );
}
