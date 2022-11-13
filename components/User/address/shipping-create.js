import React, { useState, useEffect } from 'react'
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import useCustomerCreateShipping from "../../../utils/hooks/useCustomerCreateShipping";
import { accessTokenExist, provinces } from "../../../utils/utils";
import { toast } from 'react-toastify';

export default function ShippingCreate({ setOpen }) {
    const createShipping = useCustomerCreateShipping();
    const [state, setState] = useState("");

    const handleCreate = async (e) => {
        e.preventDefault();

        let address = document.getElementById(`address`).value,
            city = document.getElementById(`city`).value,
            province = document.getElementById(`province`).innerHTML,
            postal = document.getElementById(`postal`).value;

        await createShipping.mutate({
            accessToken: accessTokenExist(),
            updateFields: {
                address1: address,
                city: city,
                country: "Canada",
                province: province,
                zip: postal,
            },
        });
    };

    useEffect(() => {
        if (createShipping.data) {
            if (createShipping.data.customerAddressCreate?.customerUserErrors?.length === 0) {
                toast.success("Created new address successfully!, please reload the page to see the update")
                if (setOpen) {
                    setOpen(false)
                }
            } else {
                toast.error("Something went wrong, please try again")
            }
        }
    }, [createShipping.data])

    return (
        <>
            <div className="flex flex-col w-80 lg:w-full space-y-8 px-5">
                <p className="text-xl font-medium">
                    Create an address
                </p>
                <form
                    className="grid grid-cols-2 gap-x-5 gap-y-2"
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
                    <Button className="col-span-2 h-10 rounded-full text-white bg-black mt-5 hover:text-black hover:bg-white hover:border-black" variant="outlined" type="submit">
                        Create
                    </Button>
                </form>
            </div>
        </>
    )
}
