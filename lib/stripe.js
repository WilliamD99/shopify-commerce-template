import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/Stripe/CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function StripeElement(children) {
    const options = {
        // passing the client secret obtained from the server
        clientSecret: "pi_3M7T29DLvTNEyZ8917d8HhId_secret_J7pzvUnsSrlpsaA8HUYE7AnWH",
    };

    return (
        <>
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
            </Elements>
        </>
    )
}
