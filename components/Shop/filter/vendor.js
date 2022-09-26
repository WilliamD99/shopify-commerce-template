import React, { useEffect, useState } from "react";

import Loading from "../../Loading/dataLoading";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { useRouter } from "next/router";
import useVendorGet from "../../../utils/hooks/useVendorGet";

export default function VendorFilter() {
  let router = useRouter();
  let routerQuery = router.query;
  let [vendorList, setVendorList] = useState([]);
  let [selectedVendors, setSelectedVendors] = useState([]);

  let vendors = useVendorGet();

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
      router.push(
        {
          pathname: window.location.pathname,
          query: routerQuery,
        },
        undefined
      );
    } else {
      routerQuery.vendors = "";
      router.push(
        {
          pathname: window.location.pathname,
          query: routerQuery,
        },
        undefined
      );
    }
  };

  useEffect(() => {
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
      <p className="text-lg font-semibold">Vendor</p>
      <FormGroup>
        {vendors.isLoading || vendors.isIdle ? (
          <Loading />
        ) : (
          vendorList.map((e, i) => (
            <FormControlLabel
              control={<Checkbox onClick={() => handleCheckbox(e.node)} />}
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
