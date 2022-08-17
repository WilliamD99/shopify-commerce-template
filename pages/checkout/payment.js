import React, { useEffect } from 'react'
import useRetrievePaymentIntent from '../../utils/hooks/useRetrievePaymentIntent'
import { useRouter } from 'next/router'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import PaymentForm from '../../components/Checkout/PaymentForm'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function Payment() {
    let pi = useRetrievePaymentIntent()
    let router = useRouter()

    useEffect(() => {
        console.log(pi)
        if (pi.isError) router.push("/checkout/review")
    }, [pi.isLoading])

    if (pi.isLoading) return <p>Loading...</p>

    return (
        <>
            <Elements stripe={stripePromise} options={{clientSecret: pi.data.clientSecret}}>
                <PaymentForm />
            </Elements>
        </>
    )
}
