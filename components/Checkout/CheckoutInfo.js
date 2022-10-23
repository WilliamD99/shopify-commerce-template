import React, { useContext, useEffect, useState } from "react";
import userContext from "../../utils/userContext";
import useCheckoutShippingUpdate from "../../utils/hooks/checkoutShippingUpdate";
import useCheckoutUpdateEmail from "../../utils/hooks/checkoutEmailUpdate";
import useCheckoutToCustomer from "../../utils/hooks/useCheckoutToCustomer";
// import useCustomerGet from '../../utils/hooks/useCustomerGet'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { provinces, accessTokenExist, decryptText } from "../../utils/utils";

export default function ShippingUpdate({ setShippingOptions }) {
  let { user } = useContext(userContext);
  let [useDefault, setUseDefault] = useState(false);
  // Update shipping
  let checkoutShippingUpdate = useCheckoutShippingUpdate();
  let checkoutEmailUpdate = useCheckoutUpdateEmail();
  let checkoutToCustomer = useCheckoutToCustomer();

  console.log(user);

  const handleDefaultAddress = (e) => {
    if (!useDefault) {
      checkoutShippingUpdate.mutate({
        address: {
          lastName: user.lastName,
          firstName: user.firstName,
          address1: user.defaultAddress.address1,
          province: user.defaultAddress.province,
          country: user.defaultAddress.country,
          zip: user.defaultAddress.zip,
          city: user.defaultAddress.city,
        },
      });
      checkoutEmailUpdate.mutate({
        email: user.email,
      });

      let firstNameTextField = document.querySelector("#firstName"),
        lastNameTextField = document.querySelector("#lastName"),
        cityTextField = document.querySelector("#city"),
        countryTextField = document.querySelector("#country"),
        provinceTextField = document.querySelector("#province"),
        postalTextField = document.querySelector("#postal"),
        addressTextField = document.querySelector("#address");

      firstNameTextField.innerHTML = "test";
    }
    setUseDefault(!useDefault);
    console.log(e.target.value);
  };

  const handleFormInfo = (e) => {
    e.preventDefault();

    let firstName = document.getElementById("firstName").value,
      lastName = document.getElementById("lastName").value,
      email = document.getElementById("email").value,
      address = document.getElementById("address").value,
      city = document.getElementById("city").value,
      province = document.getElementById("province").value,
      country = document.getElementById("country").value,
      postal = document.getElementById("postal").value;

    checkoutShippingUpdate.mutate({
      address: {
        lastName: lastName,
        firstName: firstName,
        address1: address,
        province: province,
        country: country,
        zip: postal,
        city: city,
      },
    });
    checkoutEmailUpdate.mutate({
      email: email,
    });
  };

  useEffect(() => {
    if (checkoutShippingUpdate.data && !checkoutShippingUpdate.isLoading) {
      setShippingOptions(
        checkoutShippingUpdate.data.data.checkoutShippingAddressUpdateV2
          .checkout.availableShippingRates.shippingRates
      );
    }
  }, [checkoutShippingUpdate.isLoading]);

  useEffect(() => {
    let accessToken = accessTokenExist();
    let checkoutId = sessionStorage.getItem("checkoutId")
      ? decryptText(sessionStorage.getItem("checkoutId"))
      : "";
    if (checkoutId && accessToken) {
      checkoutToCustomer.mutate({
        accessToken: accessToken,
        checkoutId: checkoutId,
      });
    }
  }, [user]);

  // useEffect(() => {
  //   if (checkoutToCustomer.data) {
  //     console.log(checkoutToCustomer.data);
  //   }
  // }, [checkoutToCustomer.data]);

  if (user.state)
    return (
      <>
        <form
          onSubmit={handleFormInfo}
          className="flex flex-col space-y-5 md:px-10 md:w-2/3"
        >
          <div className="flex flex-col space-y-5">
            <p className="text-xl font-medium">Contact Information</p>
            <div className="flex flex-row space-x-5">
              <TextField
                className="w-1/2"
                id="firstName"
                type="text"
                label="First Name"
              />
              <TextField className="w-1/2" id="lastName" label="Last Name" />
            </div>
            <div className="flex flex-row space-x-5">
              <TextField className="w-full" id="email" label="Email" />
            </div>
          </div>
          <div className="flex flex-col space-y-5">
            <p className="text-xl font-medium">Delivery Address</p>
            <div>
              <TextField className="w-full" id="address" label="Address" />
            </div>
            <div className="flex flex-row space-x-5">
              <TextField className="w-1/2" id="city" label="City" />

              <Select
                labelId="province-select"
                className="w-1/2"
                id={`province`}
                label="Province"
              >
                {provinces.map((e, i) => (
                  <MenuItem key={i} value={e.label}>
                    {e.label}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="flex flex-row space-x-5">
              <TextField className="w-1/2" id="postal" label="Postal Code" />
              <TextField
                className="w-1/2"
                id="country"
                label="Country"
                disabled
                defaultValue="Canada"
              />
            </div>
          </div>
          <Button type="submit" variant="outlined">
            Confirm
          </Button>
          {checkoutShippingUpdate.isLoading ? <p>Loading...</p> : <></>}
        </form>{" "}
      </>
    );

  return (
    <>
      <form
        onSubmit={handleFormInfo}
        className="flex flex-col space-y-5 px-10 w-2/3"
      >
        <div className="flex flex-col space-y-5">
          <p className="text-xl font-medium">Contact Information</p>
          <div className="flex flex-row space-x-5">
            <TextField
              className="w-1/2"
              id="firstName"
              type="text"
              label="First Name"
              required
              defaultValue={user ? user.firstName : ""}
            />
            <TextField
              className="w-1/2"
              id="lastName"
              required
              label="Last Name"
              defaultValue={user ? user.lastName : ""}
            />
          </div>
          <div className="flex flex-row space-x-5">
            <TextField
              className="w-full"
              id="email"
              required
              label="Email"
              defaultValue={user ? (user.email ? user.email : "") : ""}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-5">
          <p className="text-xl font-medium">Delivery Address</p>
          <div>
            <TextField
              className="w-full"
              id="address"
              label="Address"
              required
              defaultValue={
                user
                  ? user.addresses.edges.length > 0
                    ? user.addresses.edges[0].node.address1
                    : ""
                  : ""
              }
            />
          </div>
          <div className="flex flex-row space-x-5">
            <TextField
              className="w-1/2"
              id="city"
              required
              label="City"
              defaultValue={
                user
                  ? user.addresses.edges.length > 0
                    ? user.addresses.edges[0].node.city
                    : ""
                  : ""
              }
            />

            <TextField
              select
              required
              className="w-1/2"
              id={`province`}
              label="Province"
              defaultValue={
                user
                  ? user.addresses.edges.length > 0
                    ? user.addresses.edges[0].node.province
                    : ""
                  : ""
              }
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
              id="postal"
              required
              label="Postal Code"
              defaultValue={
                user
                  ? user.addresses.edges.length > 0
                    ? user.addresses.edges[0].node.zip
                    : ""
                  : ""
              }
            />
            <TextField
              className="w-1/2"
              id="country"
              label="Country"
              disabled
              defaultValue={
                user
                  ? user.addresses.edges.length > 0
                    ? user.addresses.edges[0].node.country
                    : ""
                  : ""
              }
            />
          </div>
        </div>
        <div className="flex flex-row space-x-5">
          <Button
            className="w-44 xl:w-56 text-center text-black border-black hover:text-white hover:bg-black hover:border-white"
            type="submit"
            variant="outlined"
          >
            Confirm
          </Button>
          {user.defaultAddress ? (
            <FormControlLabel
              control={
                <Checkbox
                  disabled={useDefault}
                  onClick={handleDefaultAddress}
                />
              }
              label="Use my default"
            />
          ) : (
            <></>
          )}
        </div>
        {checkoutShippingUpdate.isLoading ? <p>Loading...</p> : <></>}
      </form>
    </>
  );
}
