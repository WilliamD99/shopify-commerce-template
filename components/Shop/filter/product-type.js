import React, { useEffect, useState } from "react";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { productTypeGet } from '../../../lib/serverRequest'

export default function ProductType() {
  let [selectedTypes, setSelectedType] = useState([]);
  let router = useRouter();
  let routerQuery = router.query;
  const { data } = useQuery(["types-all"], productTypeGet, { staleTime: 24 * 60 * 60 * 1000 })

  const handleCheckbox = (e) => {
    let newList;
    delete routerQuery['cursor']
    delete routerQuery['direction']
    delete routerQuery['reversed']

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
          query: routerQuery,
        },
        undefined
      );
    } else {
      delete routerQuery.type;
      router.push(
        {
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
        {data.data.productTypes.edges.map((e, i) => (
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
