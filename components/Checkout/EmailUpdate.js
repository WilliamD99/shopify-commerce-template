import React, { useState } from 'react'
import { decryptText } from '../../utils/utils'
import useCheckoutUpdateEmail from '../../utils/hooks/checkoutEmailUpdate'

export default function EmailUpdate() {
    let [email, setEmail] = useState("dnam@gmail.com")
    let checkoutEmailUpdate = useCheckoutUpdateEmail()

    return (
        <>
            <input placeholder="Email" type="email" />
            <p onClick={() => {
                checkoutEmailUpdate.mutate(
                    {
                        checkoutId: decryptText(sessionStorage.getItem('checkoutId')), 
                        email: email
                    }
                )
            }}
            >
                Email
            </p>
        </>
    )
}
