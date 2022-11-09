import React, { useContext, useEffect, useState } from "react";
import userContext from "../../utils/userContext";
import useCheckoutShippingUpdate from "../../utils/hooks/checkoutShippingUpdate";
import useCheckoutUpdateEmail from "../../utils/hooks/checkoutEmailUpdate";
import useCheckoutToCustomer from "../../utils/hooks/useCheckoutToCustomer";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import { provinces, accessTokenExist, decryptText } from "../../utils/utils";

export default function ShippingUpdate({ refetch, data }) {
  let { user } = useContext(userContext);
  let [field, setField] = useState({
    lastName: "",
    firstName: "",
    address1: data?.shippingAddress ? data.shippingAddress.address1 : "",
    province: data?.shippingAddress ? data.shippingAddress.province : "",
    country: "Canada",
    zip: data?.shippingAddress ? data.shippingAddress.zip : "",
    city: data?.shippingAddress ? data.shippingAddress.city : "",
    email: ""
  })

  useEffect(() => {
    if (user.id) {
      setField(prev => ({
        ...prev,
        lastName: user.lastName,
        firstName: user.firstName,
        address1: user.defaultAddress?.address1,
        province: user.defaultAddress ? user.defaultAddress.province : "",
        zip: user.defaultAddress?.zip,
        city: user.defaultAddress?.city,
        email: user.email
      }))
    }
  }, [user])

  let handleFieldChange = (e) => {
    const { name, value } = e.target
    setField(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Update shipping
  let checkoutShippingUpdate = useCheckoutShippingUpdate();
  let checkoutEmailUpdate = useCheckoutUpdateEmail();
  let checkoutToCustomer = useCheckoutToCustomer();

  const handleFormInfo = (e) => {
    e.preventDefault();

    let firstName = document.getElementById("firstName").value,
      lastName = document.getElementById("lastName").value,
      email = document.getElementById("email").value,
      address = document.getElementById("address1").value,
      city = document.getElementById("city").value,
      province = document.getElementById("province").value,
      country = document.getElementById("country").value,
      zip = document.getElementById("zip").value;

    checkoutShippingUpdate.mutate({
      address: {
        lastName: lastName,
        firstName: firstName,
        address1: address,
        province: province,
        country: country,
        zip: zip,
        city: city,
      },
    });
    checkoutEmailUpdate.mutate({
      email: email,
    });
  };

  useEffect(() => {
    if (checkoutShippingUpdate.data && !checkoutShippingUpdate.isLoading) {
      refetch()
    }
  }, [checkoutShippingUpdate.isLoading]);

  useEffect(() => {
    let accessToken = accessTokenExist();
    let checkoutId = sessionStorage.getItem("checkoutId")
      ? decryptText(sessionStorage.getItem("checkoutId"))
      : "";
    if (user.id) {
      if (checkoutId && accessToken) {
        checkoutToCustomer.mutate({
          accessToken: accessToken,
          checkoutId: checkoutId,
        });
      }
    }
  }, [user]);

  return (
    <>
      <form
        onSubmit={handleFormInfo}
        className="flex flex-col space-y-5 lg:px-10 lg:w-2/3"
      >
        <div className="flex flex-col space-y-5">
          <p className="text-xl font-medium">Contact Information</p>
          <div className="flex flex-row space-x-5">
            <TextField
              className="w-1/2"
              id="firstName"
              type="text"
              label="First Name"
              name="firstName"
              required
              value={field.firstName}
              onChange={handleFieldChange}
            />
            <TextField
              className="w-1/2"
              id="lastName"
              name="lastName"
              required
              label="Last Name"
              value={field.lastName}
              onChange={handleFieldChange}
            />
          </div>
          <div className="flex flex-row space-x-5">
            <TextField
              className="w-full"
              id="email"
              name="email"
              required
              label="Email"
              onChange={handleFieldChange}
              value={field.email}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-5">
          <p className="text-xl font-medium">Delivery Address</p>
          <div>
            <TextField
              className="w-full"
              id="address1"
              name="address1"
              label="Address"
              required
              onChange={handleFieldChange}
              value={field.address1}
            />
          </div>
          <div className="flex flex-row space-x-5">
            <TextField
              className="w-1/2"
              id="city"
              name="city"
              required
              label="City"
              onChange={handleFieldChange}
              value={field.city}
            />

            <TextField
              select
              required
              className="w-1/2"
              id={`province`}
              name={`province`}
              label="Province"
              onChange={handleFieldChange}
              value={field.province}
            >
              {provinces.map((e, i) => (
                <MenuItem key={i} value={e.label}>
                  {e.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="flex flex-row space-x-5">
            <TextField
              className="w-1/2"
              id="zip"
              name="zip"
              required
              label="Postal Code"
              onChange={handleFieldChange}
              value={field.zip}
            />
            <TextField
              className="w-1/2"
              id="country"
              label="Country"
              disabled
              defaultValue="Canada"
            />
          </div>
        </div>
        <div className="flex flex-col-reverse lg:flex-row lg:space-x-5">
          <Button
            className="w-full rounded-full mt-5 lg:mt-0 xl:w-56 text-center text-white bg-black border-black hover:text-black hover:bg-white hover:border-black"
            type="submit"
            variant="outlined"
          >
            Confirm
          </Button>
        </div>
        {checkoutShippingUpdate.isLoading ? <p>Loading...</p> : <></>}
      </form>
    </>
  );
}
