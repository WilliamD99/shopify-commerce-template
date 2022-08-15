import React, { useEffect, useState } from 'react'

// Hooks
import useCheckoutCreate from '../utils/hooks/useCheckoutCreate'
import useCheckoutUpdateLines from '../utils/hooks/useCheckoutUpdateLines'
import useCreatePaymentIntent from '../utils/hooks/useCreatePaymentIntent'
// import useRetrievePaymentIntent from '../utils/hooks/useRetrievePaymentIntent'

import { encryptText } from '../utils/utils'

// Component
import EmailUpdate from '../components/Checkout/EmailUpdate'
import ShippingUpdate from '../components/Checkout/ShippingUpdate'

export default function Checkout() {
    let [cartData, setCartData] = useState()

    let checkout = useCheckoutCreate()
    // Update the line incase user comeback and add more to cart
    useCheckoutUpdateLines()
    
    // Create a Stripe Payment Intent 
    let PI = useCreatePaymentIntent()
    useEffect(() => {
        if (!PI.isLoading && PI.data !== undefined) {
            sessionStorage.setItem('pi', encryptText(PI.data.data.id))
        }
    }, [PI.isLoading])

    // Get the current payment intent
    // let _PI = useRetrievePaymentIntent()
    // useEffect(() => {
    //     console.log(_PI)
    // }, [_PI.isLoading])

    // Create checkout when first enter only
    useEffect(() => {
        if (!checkout.isLoading && checkout.data !== undefined) {
            sessionStorage.setItem('checkoutId', encryptText(checkout.data.checkoutCreate.checkout.id))
        }
    }, [checkout.isLoading])  

    // To display products in cart
    useEffect(() => {
        setCartData(JSON.parse(localStorage.getItem('items')))
    }, [])
    
    return (
        <>
            <div>Checkout</div>
                
            {
                !cartData ?
                <p>Loading</p>
                :
                cartData.map((e,i) => (
                    <div className='flex flex-row space-x-10' key={i}>
                        {/* <Single item={e}/> */}
                        <p>{e.merchandiseId}</p>
                        <p>{e.quantity}</p>
                        <p>{e.price}</p>
                    </div>
                ))
            }
            <EmailUpdate />
            <ShippingUpdate />
        </>
    )
}
