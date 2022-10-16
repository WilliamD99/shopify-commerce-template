import React, { useEffect, useState } from "react";

import Loading from "../../Loading/dataLoading";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { useRouter } from "next/router";
import { debounce } from "lodash";

export default function VendorFilter({ vendors }) {
  let router = useRouter();
  let routerQuery = router.query;
  let [vendorList] = useState(vendors);
  let [selectedVendors, setSelectedVendors] = useState([]);

  const handleCheckboxDebounce = debounce((e) => {
    handleCheckbox(e);
  }, 50);

  const handleCheckbox = (e) => {
    let newList;
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
      console.log(window.location.pathname);
      router.push(
        {
          // pathname: "/shop",
          query: routerQuery,
        },
        undefined
      );
    } else {
      routerQuery.vendors = "";
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
        {vendors.isLoading || vendors.isIdle ? (
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
        )}
      </FormGroup>{" "}
    </>
  );
}
