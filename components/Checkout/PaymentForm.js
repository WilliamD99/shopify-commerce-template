import React from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

export default function PaymentForm() {
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (elements == null) return
        // Create Payment method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
    }

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
