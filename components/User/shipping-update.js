import React, { useContext, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import userContext from '../../utils/userContext'

import { accessTokenExist, provinces } from '../../utils/utils'
import useCustomerCreateShipping from '../../utils/hooks/useCustomerCreateShipping'
import useCustomerUpdateShipping from '../../utils/hooks/useCustomerUpdateShipping'
import useCustomerGet from '../../utils/hooks/useCustomerGet'


export default function ShippingForm() {
    const { user, setUser } = useContext(userContext)
    const createShipping = useCustomerCreateShipping()
    const updateShipping = useCustomerUpdateShipping()
    const customer = useCustomerGet()

    const handleUpdate = (e, id, i) => {
        e.preventDefault()
        let address = document.getElementById(`address-${i}`).value,
            city = document.getElementById(`city-${i}`).value,
            country = document.getElementById(`country-${i}`).value,
            province = document.getElementById(`province-${i}`).value,
            postal = document.getElementById(`postal-${i}`).value
        let token = accessTokenExist()

        updateShipping.mutate({
            accessToken: token,
            updateFields: {
                address1: address,
                city: city,
                country: country,
                province: province,
                zip: postal
            },
            id: id
        })
    }

    const handleCreate = (e) => {
        e.preventDefault()

        let address = document.getElementById(`address`).value,
            city = document.getElementById(`city`).value,
            country = document.getElementById(`country`).value,
            province = document.getElementById(`province`).value,
            postal = document.getElementById(`postal`).value

        createShipping.mutate({
            updateFields: {
                address1: address,
                city: city,
                country: country,
                province: province,
                zip: postal
            }
        })
    }

    useEffect(() => {
        if (updateShipping.data && !updateShipping.isLoading) {
            let token = accessTokenExist()
            customer.mutate({accessToken: token})
        }
    }, [updateShipping.isLoading])

    useEffect(() => {
        if (customer.data && !customer.isLoading) {
            setUser(customer.data.customer)
        }
    }, [customer.isLoading])

    if (user.addresses.edges.length === 0) (
        <>
            <form onSubmit={handleCreate}>
                <TextField required id={`address`} defaultValue="Address" type="text" />
                <TextField required id={`city`} defaultValue="City" type="text" />
                <TextField required id={`province`} defaultValue="Province" type="text" />
                <TextField required id={`postal`} defaultValue="Postal Code" type="text" />
                <TextField defaultValue="Canada" disabled id={`country`} type="text" />
                <button type='submit'>Submit</button>
            </form>
        </>
    )

    return (
        <>
            {
                user.addresses.edges.map((e, i) => (
                    <form className='flex flex-col space-y-3' key={i} onSubmit={x => handleUpdate(x, e.node.id, i)}>
                        <TextField required id={`address-${i}`} label="Address" defaultValue={e.node.address1} type="text" />
                        <div className='flex flex-row space-x-3'>
                            <TextField required id={`city-${i}`} label="City" defaultValue={e.node.city} type="text" />
                            <Select required id={`province-${i}`} label="Province" defaultValue={e.node.province}>
                                {provinces.map((e, i) => (
                                    <MenuItem key={i} value={e.label}>
                                        {e.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        <TextField required id={`postal-${i}`} label="Postal Code" defaultValue={e.node.zip} type="text" />
                        <TextField id={`country-${i}`} label="Country" disabled defaultValue="Canada" type="text" />
                        <Button type='submit' variant="outlined">Submit</Button>
                    </form>
                ))
            }
        </>
    )
}
