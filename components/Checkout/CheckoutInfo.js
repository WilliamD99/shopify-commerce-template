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

export default function ShippingUpdate() {
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
            console.log(checkoutShippingUpdate)
        }
    }, [checkoutShippingUpdate.isLoading])

    return (
        <>
            {
                user ?
                <form onSubmit={handleFormInfo} className='flex flex-col space-y-5 px-10 w-2/3'>
                    <div className='flex flex-col space-y-5'>
                        <p className="text-xl font-medium">Contact Information</p>
                        <div className='flex flex-row space-x-5'>
                            <TextField id="firstName" type="text" label="First Name" defaultValue={user ? user.firstName : ""}/>
                            <TextField id="lastName" label="Last Name" defaultValue={user ? user.lastName : ""}/>
                        </div>
                        <div className='flex flex-row space-x-5'>
                            <TextField id="email" label="Email" defaultValue={user ? user.email ? user.email : "" : ""}/>
                        </div>
                    </div>
                    <div className='flex flex-col space-y-5'>
                        <p className="text-xl font-medium">Delivery Address</p>
                        <div className='w-full'>
                            <TextField 
                                id="address" 
                                label="Address"
                                defaultValue={user ? user.addresses.edges.length > 0 ? user.addresses.edges[0].node.address1 : "" : ""}
                            />
                        </div>
                        <div className='flex flex-row space-x-5'>
                            <TextField
                                id="city" 
                                label="City"
                                defaultValue={user ? user.addresses.edges.length > 0 ? user.addresses.edges[0].node.city : "" : ""}
                            />
                            <Select id={`province`} label="Province" defaultValue={user ? user.addresses.edges.length > 0 ? user.addresses.edges[0].node.province : "" : ""}>
                                {provinces.map((e, i) => (
                                    <MenuItem key={i} value={e.label}>
                                        {e.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div className='flex flex-row space-x-5'>
                            <TextField 
                                id="postal" 
                                label="Postal Code"
                                defaultValue={user ? user.addresses.edges.length > 0 ? user.addresses.edges[0].node.zip : "" : ""}
                            />
                            <TextField 
                                id="country" 
                                label="Country"
                                defaultValue={user ? user.addresses.edges.length > 0 ? user.addresses.edges[0].node.country : "" : ""} />
                        </div>
                    </div>
                    <Button type="submit" variant="outlined">Confirm</Button>
                </form>
                :
                // Form for non-user
                <form onSubmit={handleFormInfo} className='flex flex-col space-y-5 px-10 w-2/3'>
                    <div className='flex flex-col space-y-5'>
                        <p className="text-xl font-medium">Contact Information</p>
                        <div className='flex flex-row space-x-5'>
                            <TextField id="firstName" type="text" label="First Name" />
                            <TextField id="lastName" label="Last Name" />
                        </div>
                        <div className='flex flex-row space-x-5'>
                            <TextField id="email" label="Email" />
                        </div>
                    </div>
                    <div className='flex flex-col space-y-5'>
                        <p className="text-xl font-medium">Delivery Address</p>
                        <div className='w-full'>
                            <TextField 
                                id="address" 
                                label="Address"
                            />
                        </div>
                        <div className='flex flex-row space-x-5'>
                            <TextField
                                id="city" 
                                label="City"
                            />
                            <Select id={`province`} label="Province">
                                {provinces.map((e, i) => (
                                    <MenuItem key={i} value={e.label}>
                                        {e.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div className='flex flex-row space-x-5'>
                            <TextField 
                                id="postal" 
                                label="Postal Code"
                            />
                            <TextField 
                                id="country" 
                                label="Country"
                            />
                        </div>
                    </div>
                    <Button type="submit" variant="outlined">Confirm</Button>
                </form>
            }
        </>
    )
}
