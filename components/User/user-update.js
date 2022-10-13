import React, { useState, useEffect, useContext } from "react";
import userContext from "../../utils/userContext";
import useCustomerUpdate from "../../utils/hooks/useCustomerUpdate";
import { accessTokenExist } from "../../utils/utils";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Loading from "../Loading/dataLoading";

export default function UpdateForm() {
  let { user, setUser } = useContext(userContext);

  const handleUpdate = () => {
    let token = { accessToken: accessTokenExist() };

    let fields = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
    };

    let params = { ...token, updateFields: fields };
    customerUpdate.mutate(params);
  };

  let customerUpdate = useCustomerUpdate();
  useEffect(() => {
    console.log(customerUpdate);
    if (!customerUpdate.isLoading && customerUpdate.data) {
      if (customerUpdate.data.customerUpdate.customerUserErrors.length > 0) {
        toast.error(
          customerUpdate.data.customerUpdate.customerUserErrors[0].message
        );
      } else {
        setUser(customerUpdate.data.customerUpdate.customer);
        toast.success("Update Success!");
      }
    }
  }, [customerUpdate.data]);

  return (
    <>
      <p className="ml-3 mb-5 text-lg">Account Details</p>
      <div className="relative justify-center flex flex-col space-y-3 ml-3">
        <div className="flex flex-row space-x-10">
          <TextField
            className="w-80"
            id="firstName"
            label="First Name"
            defaultValue={user ? user.firstName : ""}
            // onChange={onFieldChange}
          />
          <TextField
            className="w-80"
            id="lastName"
            label="Last Name"
            defaultValue={user ? user.lastName : ""}
            // onChange={onFieldChange}
          />
        </div>
        <div className="flex flex-row space-x-10">
          <TextField
            className="w-80"
            id="email"
            label="Email"
            defaultValue={user ? user.email : ""}
            // onChange={onFieldChange}
          />
          <TextField
            className="w-80"
            id="phone"
            label="Phone"
            InputProps={{ startAdornment: <p className="mr-1">+1</p> }}
            defaultValue={
              user ? (user.phone ? user.phone.split("+1")[1] : "") : ""
            }
            // onChange={onFieldChange}
          />
        </div>

        <div className="relative flex backdrop-blur-sm flex-row space-x-2 w-full">
          <Button
            className="w-44 h-10"
            variant="outlined"
            size="medium"
            onClick={handleUpdate}
          >
            Update
            {customerUpdate.isLoading ? (
              <span className="loading absolute h-full z-50 w-full"></span>
            ) : (
              <></>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
