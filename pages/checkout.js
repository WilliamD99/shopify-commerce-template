import React, { useEffect, useContext } from 'react'
import cartContext from '../utils/cartContext'

import {useMutation} from '@tanstack/react-query'
import { checkoutCreate, cartCreate } from '../utils/api/requests'
import {decryptObject, encryptText} from '../utils/utils'

export default function Checkout() {
    const {cart, setCartStorage, setCart} = useContext(cartContext)

    // Incase user skip the cart page and go straight to the checkout page
    // need to create the cart first and then create checkout

    // Create cart mutation
    let cartCreateMutation = useMutation(async() => {
        let data = await cartCreate()
        sessionStorage.setItem('cart', encryptText(data.data.cartCreate.cart.id))
        setCartStorage(data.data.cartCreate.cart)
        return data.data.cartCreate.cart
    })

    // Create a checkout mutation
    const checkoutCreateMutation = useMutation(async(params) => {
        let data = await checkoutCreate(params)
        sessionStorage.setItem('checkoutId', encryptText(data.data.checkoutCreate.checkout.id))
        return data.data
    })

    // If there's no cart, create one
    useEffect(() => {
        if (sessionStorage.getItem('cart') === null) {
            cartCreateMutation.mutate()
            // checkoutCreateMutation.mutate({})
        }
    }, [])

    // Get the cart from sessionStorage to add it to app's state (page refresh problem)
    useEffect(() => {
        if (cart === undefined) {
            // Prevent first loaded
            if (sessionStorage.getItem('cart-items') !== null) {
                let cartNew = decryptObject(sessionStorage.getItem('cart-items'))
                setCart(cartNew)
            }
        }
        // Create checkoutId after create cart
        if (cart !== undefined && sessionStorage.getItem('checkoutId') !== null) {
            checkoutCreateMutation.mutate({edges: cart.lines.edges})
        }
    }, [cart])

    return (
        <>
            <div 
                onClick={() => {
                    console.log(cart)
                }}
            >
                Checkout
            </div>
            {
                cart !== undefined ?
                cart.lines.edges.map((e, i) => (
                    <div key={i}>
                        <p>{e.node.id}</p>
                        <p>{e.node.quantity}</p>
                    </div>
                ))
                :
                <></>
            }
        </>
    )
}

// import React, {useState, useEffect} from 'react'
// import { encryptObject, encryptText } from '../utils/utils'
// import {Elements, PaymentElement, useStripe, useElements, CardNumberElement, CardElement} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';
// import axios from 'axios';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// export default function Cart() {
//     const options = {
//         clientSecret: "pi_3LQdyPJF5iU7SUPZ0g39wV9g_secret_pBtxXBvyidaFnF3XlL1q6mY7J"
//     }

//     // useEffect(() => {
//     //     axios.post('/api/stripe/payment-intent-confirm', {
//     //         data: {
//     //             id: "pi_3LQdxJJF5iU7SUPZ1Ztv5xyK",
//     //             // update: {
//     //             //     amount: 500
//     //             // }
//     //         }
//     //     }).then(res => console.log(res))
//     //     // axios.post('/api/stripe/payment-method-create', {
//     //     //     data: {
//     //     //         number: encryptText("4242424242424242"),
//     //     //         details: encryptObject({
//     //     //             month: 7,
//     //     //             year: 28,
//     //     //             code: 270
//     //     //         })
//     //     //     }
//     //     // }).then(res => console.log(res))
//     // }, [])


//     return (
//         <Elements stripe={stripePromise} options={options}>
//             <CheckoutForm />
//         </Elements>
//     )
// }

// const CheckoutForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();
  
//     const handleSubmit = async (event) => {
//         event.preventDefault();
        
//         if (elements == null) {
//             return;
//         }
        
        
//         // Create Payment method
//         const {error, paymentMethod} = await stripe.createPaymentMethod({
//             type: 'card',
//             card: elements.getElement(CardElement),
//         });
//         stripe.createToken(elements.getElement(CardElement)).then(res => console.log(res))
//         // card_1LR01uJF5iU7SUPZ84DJsUTs
//         // tok_1LR01uJF5iU7SUPZJmxLoLYX

//         // Create Payment intent
//         // const data = await axios.post("/api/stripe/payment-intent-create", {
//         //     data: {
//         //         amount: 600,
//         //         currency: 'cad',
//         //         method: ['card']
//         //     }
//         // })

//         // Add payment method and intent --> confirm it
//         // const data = await axios.post('/api/stripe/payment-intent-confirm', {
//         //     data: {
//         //         id: "pi_3LQgX7JF5iU7SUPZ0Tvbjt8x",
//         //         method: "pm_1LQgX6JF5iU7SUPZQfKzYRBz"
//         //     }
//         // })
//         // console.log(data)

//     };
  
//     return (
//       <form onSubmit={handleSubmit}>
//         <CardElement />
//         <button type="submit" disabled={!stripe || !elements}>
//           Pay
//         </button>
//       </form>
//     );
// };
