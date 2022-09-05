import React, { useEffect, useState } from 'react'

// Hooks
import useCheckoutCreate from '../../utils/hooks/useCheckoutCreate'
import useCheckoutUpdateLines from '../../utils/hooks/useCheckoutUpdateLines'
import { decryptText, encryptText } from '../../utils/utils'

// Component
import OrderSummary from '../../components/Checkout/OrderSummary'
import CheckoutInfo from '../../components/Checkout/CheckoutInfo'
import Breadcrumbs from '../../components/Checkout/Breadcrumbs'

export default function Checkout() {
    let [cartData, setCartData] = useState()
    let [shippingOptions, setShippingOptions] = useState([])
    let [checkoutId, setCheckoutId] = useState()

    let checkout = useCheckoutCreate()
    // Update the line incase user comeback and add more to cart
    // let checkoutUpdate = useCheckoutUpdateLines()

    // Create checkout when first enter only
    useEffect(() => {
        if (!checkout.isLoading && checkout.data !== undefined) {
            sessionStorage.setItem('checkoutId', encryptText(checkout.data.checkoutCreate.checkout.id))
            setCheckoutId(checkout.data.checkoutCreate.checkout.id)
        }
        if (checkout.isError) {
            setCheckoutId(decryptText(sessionStorage.getItem('checkoutId')))
        }
    }, [checkout.isLoading])  

    // To display products in cart
    useEffect(() => {
        setCartData(JSON.parse(localStorage.getItem('items')))
    }, [])
    
    return (
        <>
            <Breadcrumbs step={2}/>
            {/* {
                !cartData ?
                <p>Loading</p>
                :
                cartData.map((e,i) => (
                    <div className='flex flex-row space-x-10' key={i}>
                        <p>{e.merchandiseId}</p>
                        <p>{e.quantity}</p>
                        <p>{e.price}</p>
                    </div>
                ))
            } */}
            <div className='flex flex-row justify-between'>
                <CheckoutInfo setShippingOptions={setShippingOptions}/>
                {
                    checkoutId ?
                    <OrderSummary checkoutId={checkoutId} shippingOptions={shippingOptions}/>
                    :
                    <></>
                }
            </div>
        </>
    )
}
