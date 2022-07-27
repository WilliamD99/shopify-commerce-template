import React, {useState, useEffect} from 'react'
import { decryptText } from '../utils/utils'
import {Elements, PaymentElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51LQIuMJF5iU7SUPZMkeKONKxr2VfCqcX9MS47jq5ozvEmg8BEJpaecDNiGW26bZHHAm0HxEF3VpCRvtTe9YscqUk00tL1zYHtS');

export default function Cart() {
    const options = {
        clientSecret: "pi_3LQJZhJF5iU7SUPZ07JPxJw6_secret_yw2t0PMdheMNFM0gbilOvOkQ9"
    }

    useEffect(() => {
        axios.get('/api/stripe/test', {
            data: {
                amount: 2000,
                currency: "cad",
                method: ['card']
            }
        }).then(res => console.log(res))
    }, [])

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    )
}

let CheckoutForm = () => {
    return (
        <>
            <form>
                <PaymentElement />
                <button>Submit</button>
            </form>
        </>
    )
}
