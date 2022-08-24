import React, { useEffect, useContext, useCallback } from 'react'
import useCustomerGetAccessToken from '../../utils/hooks/useCustomerGetAccessToken'
import { encryptText } from '../../utils/utils'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'

import useCustomerGet from '../../utils/hooks/useCustomerGet'
import userContext from '../../utils/userContext'

export default function Login({open, setOpen}) {
    const {user, setUser} = useContext(userContext)

    let getAccessToken = useCustomerGetAccessToken()
    let customer = useCustomerGet()

    const handleLogin = useCallback(() => {
        let email = document.getElementById("email")
        let password = document.getElementById("password")
        getAccessToken.mutate({ email: email.value, password: password.value })
    }, [])

    // get access token after handleLogin run
    useEffect(() => {
        if (getAccessToken.data !== undefined && !getAccessToken.isError) {
            let token = getAccessToken.data.customerAccessTokenCreate.customerAccessToken
            if (token) {
                customer.mutate({accessToken: token.accessToken})
                document.cookie = `token=${encryptText(token.accessToken)};expires=${token.expiresAt}`
            }
            else {
                let error = getAccessToken.data.customerAccessTokenCreate.customerUserErrors[0].message
                console.log(error)
            }
        }
    }, [getAccessToken.isLoading])

    // after got the access token, get the customer
    useEffect(() => {
        if (customer.data && !customer.isError) {
            setUser(customer.data.customer)
        }
    }, [customer.isLoading])

    // if successfully get customer, close the modal
    useEffect(() => {
        if (user) setOpen(false)
    }, [user])

    return (
        <>
            <Modal aria-labelledby='Login Modal' open={open} onClose={() => setOpen(false)}>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-5 flex flex-col justify-center space-y-5 bg-slate-200 rounded-lg'>
                    <p className='text-black font-bold text-xl absolute left-1/2 -translate-x-1/2 -top-4'>Login</p>
                    <TextField label="Email" type="email" id="email" />
                    <TextField label="Password" type="password" id="password"/>
                    <p className='text-black' onClick={handleLogin}>
                        {getAccessToken.isLoading ? "Loading" : "Login"}
                    </p>
                </div>
            </Modal>
        </>
    )
}
