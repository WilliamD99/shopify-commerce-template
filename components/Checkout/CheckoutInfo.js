import React, { useContext, useEffect, useState } from 'react'
import userContext from '../../utils/userContext'
import useCheckoutShippingUpdate from '../../utils/hooks/checkoutShippingUpdate'
import useCheckoutUpdateEmail from '../../utils/hooks/checkoutEmailUpdate'
// import useCustomerGet from '../../utils/hooks/useCustomerGet'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { provinces } from '../../utils/utils'

export default function ShippingUpdate({setShippingOptions}) {
    let { user, setUser } = useContext(userContext)
    // Update shipping
    let checkoutShippingUpdate = useCheckoutShippingUpdate()
    let checkoutEmailUpdate = useCheckoutUpdateEmail()

    const handleFormInfo = (e) => {
        e.preventDefault()

        let firstName = document.getElementById("firstName").value,
            lastName = document.getElementById("lastName").value,
            email = document.getElementById("email").value,
            address = document.getElementById("address").value,
            city = document.getElementById("city").value,
            province = document.getElementById("province").value,
            country = document.getElementById("country").value,
            postal = document.getElementById("postal").value

        checkoutShippingUpdate.mutate({
            address: {
                lastName: lastName,
                firstName: firstName,
                address1: address,
                province: province,
                country: country,
                zip: postal,
                city: city
            }
        })
        checkoutEmailUpdate.mutate({
            email: email
        })
    }

    useEffect(() => {
        if (checkoutShippingUpdate.data && !checkoutShippingUpdate.isLoading) {
            setShippingOptions(checkoutShippingUpdate.data.data.checkoutShippingAddressUpdateV2.checkout.availableShippingRates.shippingRates)
        }
    }, [checkoutShippingUpdate.isLoading])

    if (!user) return (
        <>
            <div className="w-2/3"></div>
        </>
    )

    return (
        <>
            <form onSubmit={handleFormInfo} className='flex flex-col space-y-5 px-10 w-2/3'>
                <div className='flex flex-col space-y-5'>
                    <p className="text-xl font-medium">Contact Information</p>
                    <div className='flex flex-row space-x-5'>
                        <TextField className='w-1/2' id="firstName" type="text" label="First Name" defaultValue={user ? user.firstName : ""}/>
                        <TextField className='w-1/2' id="lastName" label="Last Name" defaultValue={user ? user.lastName : ""}/>
                    </div>
                    <div className='flex flex-row space-x-5'>
                        <TextField className='w-full' id="email" label="Email" defaultValue={user ? user.email ? user.email : "" : ""}/>
                    </div>
                </div>
                <div className='flex flex-col space-y-5'>
                    <p className="text-xl font-medium">Delivery Address</p>
                    <div>
                        <TextField 
                            className="w-full"
                            id="address" 
                            label="Address"
                            defaultValue={user ? user.addresses.edges.length > 0 ? user.addresses.edges[0].node.address1 : "" : ""}
                        />
                    </div>
                    <div className='flex flex-row space-x-5'>
                        <TextField
                            className='w-1/2'
                            id="city" 
                            label="City"
                            defaultValue={user ? user.addresses.edges.length > 0 ? user.addresses.edges[0].node.city : "" : ""}
                        />

                        <Select labelId="province-select" className='w-1/2' id={`province`} label="Province" defaultValue={user ? user.addresses.edges.length > 0 ? user.addresses.edges[0].node.province : "" : ""}>
                            {provinces.map((e, i) => (
                                <MenuItem key={i} value={e.label}>
                                    {e.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div className='flex flex-row space-x-5'>
                        <TextField 
                            className="w-1/2"
                            id="postal" 
                            label="Postal Code"
                            defaultValue={user ? user.addresses.edges.length > 0 ? user.addresses.edges[0].node.zip : "" : ""}
                        />
                        <TextField 
                            className='w-1/2'
                            id="country" 
                            label="Country"
                            disabled
                            defaultValue={user ? user.addresses.edges.length > 0 ? user.addresses.edges[0].node.country : "" : ""} />
                    </div>
                </div>
                <Button type="submit" variant="outlined">Confirm</Button>
                {
                    checkoutShippingUpdate.isLoading ? 
                    <p>Loading...</p>
                    :
                    <></>
                }
            </form>
        </>
    )
}
