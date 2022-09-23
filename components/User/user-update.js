import React, { useState, useEffect, useContext } from "react";
import userContext from "../../utils/userContext";
import useCustomerUpdate from "../../utils/hooks/useCustomerUpdate";
import { accessTokenExist } from "../../utils/utils";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function UpdateForm() {
  let { user, setUser } = useContext(userContext);
  let [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const onFieldChange = (e) => {
    return [
      fields,
      setFields({
        ...fields,
        [e.target.id]: e.target.value,
      }),
    ];
  };
  const handleUpdate = () => {
    let token = { accessToken: accessTokenExist() };
    let params = { ...token, updateFields: fields };
    customerUpdate.mutate(params);
  };

  let customerUpdate = useCustomerUpdate();
  useEffect(() => {
    if (!customerUpdate.isLoading && customerUpdate.data) {
      if (customerUpdate.data.customerUpdate.customerUserErrors.length > 0) {
        console.log(
          customerUpdate.data.customerUpdate.customerUserErrors[0].message
        );
      } else {
        setUser(customerUpdate.data.customerUpdate.customer);
      }
    }
  }, [customerUpdate.data]);

  return (
    <>
      <p className="ml-3 mb-5 text-lg">Account Details</p>
      <div className="flex flex-col space-y-3 ml-3">
        <div className="flex flex-row space-x-10">
          <TextField
            className="w-80"
            id="firstName"
            label="First Name"
            defaultValue={user ? user.firstName : ""}
            onChange={onFieldChange}
          />
          <TextField
            className="w-80"
            id="lastName"
            label="Last Name"
            defaultValue={user ? user.lastName : ""}
            onChange={onFieldChange}
          />
        </div>
        <div className="flex flex-row space-x-10">
          <TextField
            className="w-80"
            id="email"
            label="Email"
            defaultValue={user ? user.email : ""}
            onChange={onFieldChange}
          />
          <TextField
            className="w-80"
            id="phone"
            label="Phone"
            InputProps={{ startAdornment: <p className="mr-1">+1</p> }}
            defaultValue={
              user ? (user.phone ? user.phone.split("+1")[1] : "") : ""
            }
            onChange={onFieldChange}
          />
        </div>

        <div>
          <Button variant="outlined" size="medium" onClick={handleUpdate}>
            Update
          </Button>
        </div>
      </div>
    </>
  );
}
