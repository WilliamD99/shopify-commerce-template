import React, { useEffect, useState } from "react";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { useRouter } from "next/router";

export default function ProductType({ types }) {
  let [productTypeList] = useState(types);
  let [selectedTypes, setSelectedType] = useState([]);
  let router = useRouter();
  let routerQuery = router.query;

  const handleCheckbox = (e) => {
    let newList;
    if (selectedTypes.includes(e)) {
      newList = selectedTypes.filter((selected) => selected !== e);

      setSelectedType(newList);
    } else {
      newList = selectedTypes;
      newList.push(e);
      setSelectedType(newList);
    }
    if (newList.length > 0) {
      routerQuery.type = encodeURIComponent(newList.join(","));
      router.push(
        {
          // pathname: window.location.pathname,
          query: routerQuery,
        },
        undefined
      );
    } else {
      routerQuery.type = "";
      router.push(
        {
          // pathname: window.location.pathname,
          query: routerQuery,
        },
        undefined
      );
    }
  };

  useEffect(() => {
    if (routerQuery) {
      if (routerQuery.type) {
        setSelectedType(decodeURIComponent(routerQuery.type).split(","));
      }
    }
  }, [routerQuery]);

  return (
    <>
      <FormGroup>
        {productTypeList.map((e, i) => (
          <FormControlLabel
            control={<Checkbox onClick={() => handleCheckbox(e.node)} />}
            label={<p className="text-lg">{e.node}</p>}
            key={i}
            checked={selectedTypes.includes(e.node)}
          />
        ))}
      </FormGroup>{" "}
    </>
  );
}
