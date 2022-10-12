import React, { useContext, useEffect, useState } from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import userContext from "../../utils/userContext";
import { accessTokenExist, provinces, gsap } from "../../utils/utils";
import useCustomerCreateShipping from "../../utils/hooks/useCustomerCreateShipping";
import useCustomerUpdateShipping from "../../utils/hooks/useCustomerUpdateShipping";
import useCustomerGet from "../../utils/hooks/useCustomerGet";
import useDefaultAddressUpdate from "../../utils/hooks/useDefaultAddressUpdate";

import { toast } from "react-toastify";

export default function ShippingForm() {
  const { user } = useContext(userContext);
  const [defaultId, setDefaultId] = useState(
    user.defaultAddress ? user.defaultAddress.id : ""
  );
  const [addressArr, setAddressArr] = useState(user.addresses.edges);
  const [state, setState] = useState("");
  const createShipping = useCustomerCreateShipping();
  const updateShipping = useCustomerUpdateShipping();
  const customer = useCustomerGet();

  const handleUpdate = async (e, id, i) => {
    e.preventDefault();
    let address = document.getElementById(`address-${i}`).value,
      city = document.getElementById(`city-${i}`).value,
      country = document.getElementById(`country-${i}`).value,
      province = document.getElementById(`province-${i}`).innerHTML,
      postal = document.getElementById(`postal-${i}`).value;
    let token = accessTokenExist();

    await updateShipping.mutate({
      accessToken: token,
      updateFields: {
        address1: address,
        city: city,
        country: country,
        province: province,
        zip: postal,
      },
      id: id,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    let address = document.getElementById(`address`).value,
      city = document.getElementById(`city`).value,
      country = document.getElementById(`country`).value,
      province = document.getElementById(`province`).innerHTML,
      postal = document.getElementById(`postal`).value;

    await createShipping.mutate({
      accessToken: accessTokenExist(),
      updateFields: {
        address1: address,
        city: city,
        country: country,
        province: province,
        zip: postal,
      },
    });
  };

  // Checkbox default address
  let updateDefault = useDefaultAddressUpdate();
  const handleCheckDefault = (id) => {
    setDefaultId(id);
    let accessToken = accessTokenExist();
    updateDefault.mutate({ accessToken: accessToken, addressId: id });
  };

  // Update existing address
  useEffect(() => {
    if (updateShipping.data && !updateShipping.isLoading) {
      let token = accessTokenExist();
      customer.mutate({ accessToken: token });
    }
    if (updateShipping.isSuccess) toast.success("Update Successfully!");
  }, [updateShipping.isLoading]);

  if (user.addresses.edges.length === 0)
    return (
      <>
        <div className="flex flex-col space-y-10">
          <p className="text-lg">
            Add a new shipping address for faster checkout
          </p>
          <form
            className="grid grid-cols-2 w-2/3 gap-x-5 gap-y-2"
            onSubmit={handleCreate}
          >
            <TextField
              className="col-span-2"
              required
              id={`address`}
              label="Address"
              type="text"
            />
            <TextField required id={`city`} label="City" type="text" />
            <TextField
              id="province"
              select
              required
              label="Province"
              value={state}
            >
              {provinces.map((e, i) => (
                <MenuItem
                  key={i}
                  value={e.label}
                  onClick={() => setState(e.label)}
                >
                  {e.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField required id={`postal`} label="Postal Code" type="text" />
            <TextField label="Canada" disabled id={`country`} type="text" />
            <Button variant="outlined" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </>
    );

  return (
    <>
      <p className="ml-3 mb-5 text-lg">Shipping Details</p>
      <div className="flex flex-col space-y-10 w-2/3">
        {addressArr.map((e, i) => (
          <div className="ml-8" key={i}>
            <p className="text-base mb-5">
              Address {parseInt(i) + 1}
              {user.defaultAddress.id === e.node.id ? (
                <span className="ml-2 font-semibold">(Default)</span>
              ) : (
                <></>
              )}
            </p>
            <form
              className="grid grid-cols-2 gap-4 mb-5"
              onSubmit={(x) => handleUpdate(x, e.node.id, i)}
            >
              <TextField
                className="col-span-2"
                required
                id={`address-${i}`}
                label="Address"
                defaultValue={e.node.address1}
                type="text"
              />
              {/* <div className='flex flex-row space-x-3'> */}
              <TextField
                required
                id={`city-${i}`}
                label="City"
                defaultValue={e.node.city}
                type="text"
              />
              <TextField
                select
                required
                id={`province-${i}`}
                label="Province"
                defaultValue={e.node.province}
              >
                {provinces.map((e, i) => (
                  <MenuItem key={i} value={e.label}>
                    {e.label}
                  </MenuItem>
                ))}
              </TextField>
              {/* </div> */}
              <TextField
                required
                id={`postal-${i}`}
                label="Postal Code"
                defaultValue={e.node.zip}
                type="text"
              />
              <TextField
                id={`country-${i}`}
                label="Country"
                disabled
                defaultValue="Canada"
                type="text"
              />
            </form>
            <div className="flex flex-row items-center space-x-5">
              <Button
                onClick={(x) => handleUpdate(x, e.node.id, i)}
                className="text-black border-black normal-case"
                type="submit"
                variant="outlined"
              >
                Edit
              </Button>
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={defaultId === e.node.id ? true : false}
                    checked={defaultId === e.node.id ? true : false}
                    onClick={() => handleCheckDefault(e.node.id)}
                  />
                }
                label="Make this default address"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
