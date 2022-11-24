import React from 'react'
import {
    CardElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (elements == null) {
            return;
        }

        // const { error, paymentMethod } = await stripe.createPaymentMethod({
        //     type: 'card',
        //     card: elements.getElement(CardElement),
        // });
        // console.log(paymentMethod)
        // let token = await stripe.createToken(elements.getElement(CardElement))
        // console.log(token)
        // const { paymentIntent, error } = stripe.confirmCardPayment("pi_3M7T29DLvTNEyZ8917d8HhId_secret_J7pzvUnsSrlpsaA8HUYE7AnWH", {
        //     payment_method: {
        //         card: elements.getElement(CardElement),
        //         billing_details: {
        //             name: "Nam Doan"
        //         }
        //     }
        // })
        // console.log(paymentIntent, error)

    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement className='px-5 py-5 bg-slate-100' />
            <button type="submit" disabled={!stripe || !elements}>
                Pay
            </button>
        </form>
    )
}
// tok_1M7ShnDLvTNEyZ89o2cuDTp1
// pm_1M7ShnDLvTNEyZ89WDtsCJRD