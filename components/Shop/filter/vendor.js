import React, { useEffect, useState } from "react";

import Loading from "../../Loading/dataLoading";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { useRouter } from "next/router";
import { debounce } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { vendorsGet } from "../../../lib/serverRequest";

export default function VendorFilter() {
  let router = useRouter();
  let routerQuery = router.query;
  // let [vendorList] = useState();
  let [selectedVendors, setSelectedVendors] = useState([]);

  const { data } = useQuery(['vendors-all'], vendorsGet, { staleTime: 24 * 60 * 60 * 1000 })

  const handleCheckboxDebounce = debounce((e) => {
    handleCheckbox(e);
  }, 50);

  const handleCheckbox = (e) => {
    let newList;
    delete routerQuery['cursor']
    delete routerQuery['direction']
    delete routerQuery['reversed']

    if (selectedVendors.includes(e)) {
      newList = selectedVendors.filter((selected) => selected !== e);

      setSelectedVendors(newList);
    } else {
      newList = selectedVendors;
      newList.push(e);
      setSelectedVendors(newList);
    }
    if (newList.length > 0) {
      routerQuery.vendors = encodeURIComponent(newList.join(","));
      router.push(
        {
          query: routerQuery,
        },
        undefined
      );
    } else {
      delete routerQuery.vendors;
      router.push(
        {
          query: routerQuery,
        },
        undefined
      );
    }
  };

  useEffect(() => {
    setSelectedVendors([]);
    if (routerQuery) {
      if (routerQuery.vendors) {
        setSelectedVendors(decodeURIComponent(routerQuery.vendors).split(","));
      }
    }
  }, [routerQuery]);

  return (
    <>
      <FormGroup>
        {/* {vendors.isLoading || vendors.isIdle ? (
          <Loading />
        ) : (
          vendorList.map((e, i) => (
            <FormControlLabel
              control={
                <Checkbox onClick={() => handleCheckboxDebounce(e.node)} />
              }
              label={<p className="text-lg">{e.node}</p>}
              key={i}
              checked={selectedVendors.includes(e.node)}
            />
          ))
        )} */}
        {
          data.data.shop.productVendors.edges.map((e, i) => (
            <FormControlLabel
              control={
                <Checkbox onClick={() => handleCheckboxDebounce(e.node)} />
              }
              label={<p className="text-lg">{e.node}</p>}
              key={i}
              checked={selectedVendors.includes(e.node)}
            />
          ))
        }
      </FormGroup>{" "}
    </>
  );
}
