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

  const handleUpdate = (e) => {
    e.preventDefault()
    let token = { accessToken: accessTokenExist() };

    let fields = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      phone: document.getElementById("phone").value,
    };

    let params = { ...token, updateFields: fields };
    customerUpdate.mutate(params);
  };

  let customerUpdate = useCustomerUpdate();
  useEffect(() => {
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
      <p className="px-5 lg:pl-3 mb-5 text-lg">Account Details</p>
      <form onSubmit={handleUpdate} className="relative justify-center flex flex-col space-y-5 lg:space-y-3 px-5 lg:pl-3">
        <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-10">
          <TextField
            className="w-full lg:w-80"
            id="firstName"
            label="First Name"
            required
            defaultValue={user ? user.firstName : ""}
          // onChange={onFieldChange}
          />
          <TextField
            className="w-full lg:w-80"
            id="lastName"
            label="Last Name"
            required
            defaultValue={user ? user.lastName : ""}
          // onChange={onFieldChange}
          />
        </div>
        <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-10">
          <TextField
            className="w-full lg:w-80"
            id="email"
            label="Email"
            required
            defaultValue={user ? user.email : ""}
            disabled
          // onChange={onFieldChange}
          />
          <TextField
            className="w-full lg:w-80"
            id="phone"
            label="Phone"
            required
            InputProps={{ startAdornment: <p className="mr-1">+1</p> }}
            defaultValue={
              user ? (user.phone ? user.phone.split("+1")[1] : "") : ""
            }
          // onChange={onFieldChange}
          />
        </div>

        <div className="relative flex justify-center backdrop-blur-sm flex-row space-x-2 w-full">
          <Button
            className="w-44 h-10 rounded-full text-white bg-black hover:text-black hover:bg-white hover:border-black"
            variant="outlined"
            size="medium"
            type="submit"
          >
            Update
          </Button>
        </div>
      </form>
    </>
  );
}
