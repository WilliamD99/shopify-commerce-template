import React, { useEffect, useState } from "react";

import Loading from "../../Loading/dataLoading";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { useRouter } from "next/router";
import useVendorGet from "../../../utils/hooks/useVendorGet";
import { debounce } from "lodash";

export default function VendorFilter() {
  let router = useRouter();
  let routerQuery = router.query;
  let [vendorList, setVendorList] = useState([]);
  let [selectedVendors, setSelectedVendors] = useState([]);

  let vendors = useVendorGet();

  const handleCheckboxDebounce = debounce((e) => {
    handleCheckbox(e);
  }, 100);

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

  useEffect(() => {
    vendors.mutate();
  }, []);

  useEffect(() => {
    if (vendors.data) setVendorList(vendors.data.shop.productVendors.edges);
  }, [vendors.data]);

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
