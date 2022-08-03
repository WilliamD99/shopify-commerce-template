import React, {useEffect} from 'react'
import { checkoutCompleteStripe, checkoutEmailUpdate, checkoutShippingLineUpdate, checkoutShippingUpdate, deliveryAll } from '../utils/api/requests'
import {useMutation} from '@tanstack/react-query'

import {decryptText} from '../utils/utils'

export default function Index() {

    const checkoutCompleteStripeMutation = useMutation(async(params) => {
        let checkoutIdEncrypt = sessionStorage.getItem('checkoutId')
        if (checkoutIdEncrypt === null) {
            alert('No checkout id found')
            return
        }
        params.checkoutId = decryptText(checkoutIdEncrypt)

        let data = await checkoutCompleteStripe(params)
        console.log(data)
        return data.data
    })
    const checkoutShippingAddressUpdateMutation = useMutation(async(params) => {
        let checkoutIdEncrypt = sessionStorage.getItem('checkoutId')
        if (checkoutIdEncrypt === null) {
            alert('No checkout id found')
            return
        }
        params.checkoutId = decryptText(checkoutIdEncrypt)

        let data = await checkoutShippingUpdate(params)
        console.log(data)
        return data
    })

    const checkoutShippingLineMutation = useMutation(async(params) => {
        let checkoutIdEncrypt = sessionStorage.getItem('checkoutId')
        if (checkoutIdEncrypt === null) {
            alert('No checkout id found')
            return
        }
        params.checkoutId = decryptText(checkoutIdEncrypt)

        let data = await checkoutShippingLineUpdate(params)
        console.log(data)
        return data.data
    })

    const deliveryAllMutation = useMutation(async() => {
        let data = await deliveryAll()
        console.log(data)
        return data.data
    })

    const checkoutEmailUpdateMutation = useMutation(async(params) => {
        let checkoutIdEncrypt = sessionStorage.getItem('checkoutId')
        if (checkoutIdEncrypt === null) {
            alert('No checkout id found')
            return
        }
        params.checkoutId = decryptText(checkoutIdEncrypt)

        let data = await checkoutEmailUpdate(params)
        return data
    })

    return (
        <>
            <p onClick={() => {
                checkoutEmailUpdateMutation.mutate({})
            }}>Update email</p>
            <p onClick={() => {
                checkoutShippingLineMutation.mutate({shippingRateHandle: "general-profile"})
            }}>Shipping line</p>
            <p onClick={() => {
                deliveryAllMutation.mutate()
            }}>Delivery</p>
            <p onClick={() => {
                checkoutShippingAddressUpdateMutation.mutate({
                    address: {
                        "address1": "2323 Van str",
                        "address2": "",
                        "city": "Vancouver",
                        "company": "test",
                        "country": "Canada",
                        "firstName": "John",
                        "lastName": "Wickz",
                        "phone": "123456",
                        "province": "BC",
                        "zip": "V5N2Y2"
                    }
                })
            }}>Address</p>
            <p onClick={() => {
                console.log('test')
                checkoutCompleteStripeMutation.mutate({
                    payment: {
                        paymentAmount: {
                            amount: "88.71",
                            currencyCode: "USD"
                        },
                        idempotencyKey: "123",
                        billingAddress: {
                            firstName: "John",
                            lastName: "Doe",
                            address1: "123 Test Street",
                            province: "Quebec",
                            country: "Canada",
                            city: "Montreal",
                            zip: "H3K0X2"
                        },
                        type: "STRIPE_VAULT_TOKEN",
                        paymentData: "tok_1LR01uJF5iU7SUPZJmxLoLYX"
                    }
                })
            }}>Click me</p>
        </>
    )
}
