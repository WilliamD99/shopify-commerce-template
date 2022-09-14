import React, { useContext, useEffect, useState, useRef } from 'react'

import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

import userContext from '../../utils/userContext'
import { accessTokenExist, provinces, gsap } from '../../utils/utils'
import useCustomerCreateShipping from '../../utils/hooks/useCustomerCreateShipping'
import useCustomerUpdateShipping from '../../utils/hooks/useCustomerUpdateShipping'
import useCustomerGet from '../../utils/hooks/useCustomerGet'
import useDefaultAddressUpdate from '../../utils/hooks/useDefaultAddressUpdate'


export default function ShippingForm() {
    const { user } = useContext(userContext)
    const [defaultId, setDefaultId] = useState(user.defaultAddress.id)
    const [addressArr, setAddressArr] = useState(user.addresses.edges)
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

    // Checkbox default address
    let updateDefault = useDefaultAddressUpdate()
    const handleCheckDefault = (id) => {
        setDefaultId(id)
        !alertRef.current.reversed() ? alertRef.current.play() : alertRef.current.reverse()
        let accessToken = accessTokenExist()
        updateDefault.mutate({accessToken: accessToken, addressId: id})
    }

    // Update existing address
    useEffect(() => {
        if (updateShipping.data && !updateShipping.isLoading) {
            let token = accessTokenExist()
            customer.mutate({accessToken: token})
        }
    }, [updateShipping.isLoading])

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
            <p className='ml-3 mb-5 text-lg'>Shipping Details</p>
            <div className='flex flex-col space-y-10 w-2/3'>
                {
                    addressArr.map((e, i) => (
                        <div className='ml-8' key={i}>
                            <p className='text-base mb-5'>
                                Address {parseInt(i) + 1}
                                {
                                    user.defaultAddress.id === e.node.id ?
                                    <span className='ml-2 font-semibold'>(Default)</span>
                                    :
                                    <></>
                                }
                            </p>
                            <form className='grid grid-cols-2 gap-4 mb-5' onSubmit={x => handleUpdate(x, e.node.id, i)}>
                                <TextField className='col-span-2' required id={`address-${i}`} label="Address" defaultValue={e.node.address1} type="text" />
                                {/* <div className='flex flex-row space-x-3'> */}
                                <TextField required id={`city-${i}`} label="City" defaultValue={e.node.city} type="text" />
                                <Select required id={`province-${i}`} label="Province" defaultValue={e.node.province}>
                                    {provinces.map((e, i) => (
                                        <MenuItem key={i} value={e.label}>
                                            {e.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {/* </div> */}
                                <TextField required id={`postal-${i}`} label="Postal Code" defaultValue={e.node.zip} type="text" />
                                <TextField id={`country-${i}`} label="Country" disabled defaultValue="Canada" type="text" />
                            </form>
                            <div className='flex flex-row items-center space-x-5'>
                                <Button onClick={x => handleUpdate(x, e.node.id, i)} className='text-black border-black normal-case' type='submit' variant="outlined">Edit</Button>
                                <FormControlLabel control={<Checkbox disabled={defaultId === e.node.id ? true : false} checked={defaultId === e.node.id ? true : false} onClick={() => handleCheckDefault(e.node.id)}/>} label="Make this default address" />
                            </div>
                        </div>
                    ))
                }
            </div>
            <Stack id="alert-stack" className='hidden fixed z-50 w-72 right-5 bottom-5' spacing={2}>
                <Alert severity='success'>Update sucessful!</Alert>
            </Stack>
        </>
    )
}
