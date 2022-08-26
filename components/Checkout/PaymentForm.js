import React from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { decryptText } from '../../utils/utils'

export default function PaymentForm() {
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (elements == null) return
        // Create Payment method
        // const { error, paymentMethod } = await stripe.createPaymentMethod({
        //     type: "card",
        //     card: elements.getElement(CardElement)
        // })
        
        let token = await stripe.createToken(elements.getElement(CardElement))
        console.log(token)
    }

    // let token = {
        // "token": {
        //     "id": "tok_1LaT7xJF5iU7SUPZAenxZ2Kh",
        //     "object": "token",
        //     "card": {
        //         "id": "card_1LaT7xJF5iU7SUPZwroEJRyn",
        //         "object": "card",
        //         "address_city": null,
        //         "address_country": null,
        //         "address_line1": null,
        //         "address_line1_check": null,
        //         "address_line2": null,
        //         "address_state": null,
        //         "address_zip": "29980",
        //         "address_zip_check": "unchecked",
        //         "brand": "Visa",
        //         "country": "US",
        //         "cvc_check": "unchecked",
        //         "dynamic_last4": null,
        //         "exp_month": 3,
        //         "exp_year": 2028,
        //         "funding": "credit",
        //         "last4": "4242",
        //         "name": null,
        //         "tokenization_method": null
        //     },
        //     "client_ip": "184.67.5.50",
        //     "created": 1661384213,
        //     "livemode": false,
        //     "type": "card",
        //     "used": false
        // }
    // }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type='submit' disabled={!stripe || !elements}>
                    Pay
                </button>
            </form>
        </>
    )
}
