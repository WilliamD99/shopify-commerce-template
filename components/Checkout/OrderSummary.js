import React, { useEffect, useState, useContext } from 'react'
import cartContext from '../../utils/cartContext'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Divider from '@mui/material/Divider'

import useCheckoutShippingLineUpdate from '../../utils/hooks/useCheckoutShippingLineUpdate'
import useCreatePaymentIntent from '../../utils/hooks/useCreatePaymentIntent'
import useCheckoutGet from '../../utils/hooks/useCheckoutGet'

import { useRouter } from 'next/router'
import { decryptText, encryptText } from '../../utils/utils'
import axios from 'axios'

export default function OrderSummary({shippingOptions, checkoutId}) {
    const { cart } = useContext(cartContext)
    const [ total, setTotal ] = useState(0) 
    const [ totalLine, setTotalLine ] = useState(0)
    const [ tax, setTax ] = useState(0)
    const [ shippingRateHandle, setShippingRateHandle ] = useState([])
    const [ selectedRate, setSelectedRate ] = useState('')
    const [ ready, setReady ] = useState(false) // Detect if user has finish confirm all the info
    const checkoutShippingLineUpdate = useCheckoutShippingLineUpdate()
    const pi = useCreatePaymentIntent()
    const router = useRouter()

    let checkout = useCheckoutGet()

    useEffect(() => {
        checkout.mutate({id: (checkoutId)})
    }, [shippingOptions, checkoutShippingLineUpdate.isLoading])

    useEffect(() => {
        if (checkout.data) {
            setTotalLine(parseFloat(checkout.data.node.lineItemsSubtotalPrice.amount))
            setTax(parseFloat(checkout.data.node.totalTaxV2.amount))
            setTotal(parseFloat(checkout.data.node.totalPriceV2.amount))
            if (checkout.data.node.availableShippingRates) {
                setShippingRateHandle(checkout.data.node.availableShippingRates.shippingRates)
            }
            if (checkout.data.node.shippingLine) {
                setSelectedRate(checkout.data.node.shippingLine.handle)
            }
        }
    }, [checkout.isLoading, checkoutShippingLineUpdate.isLoading])

    const handleShippingRadio = (e) => {
        let id = sessionStorage.getItem('checkoutId')
        if (id) {
            id = decryptText(id)
            checkoutShippingLineUpdate.mutate({
                checkoutId: id,
                shippingRateHandle: e.handle
            })
        }
    }

    const handleComplete = async () => {
        // let data = await axios.post("/api/storefront/mutation/checkout-complete-stripe", {
        //     data: {
        //         checkoutId: decryptText(sessionStorage.getItem('checkoutId'))
        //     }
        // })
        // console.log(data.data)
        if (!sessionStorage.getItem('client')) {
            pi.mutate({
                amount: Math.ceil((total).toFixed(2) * 100),
                currency: "cad",
                method: ['card']
            })
        }
        setReady(true)
    }

    // If created pi succeed, log it to sessionStorage
    useEffect(() => {
        if (pi.data && !pi.isLoading) {
            sessionStorage.setItem('client', encryptText(pi.data.data))
        }
    }, [pi.isLoading])

    // If ready is true is done creating pi, re-route
    // useEffect(() => {
    //     if (ready && !pi.isLoading && pi.data) {
    //         router.push('/checkout/payment')
    //     }
    //     if (ready && !pi.isLoading && !pi.data) {
    //         console.log(ready)
    //         console.log(!pi.isLoading)
    //         console.log(!pi.data)
    //     }
    // }, [ready, pi.isLoading])

    if (!cart) (
        <div className='w-1/3 bg-slate-100'></div>
    )

    return (
        <div className='mr-10 px-8 py-5 flex flex-col w-1/3 relative bg-slate-100'>
            {
                !checkoutShippingLineUpdate.isLoading && !checkout.isLoading && !pi.isLoading ?
                <></>
                :
                <>
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50'>Loading...</div>
                    <div className='absolute w-full h-full top-0 left-0 backdrop-blur-sm z-40'></div>
                </>
            }
            <p className='text-xl font-semibold'>Order Summary</p>
            <div className='flex flex-col space-y-3 my-8'>
                <div className='flex flex-row justify-between'>
                    <p className='text-base font-medium'>Subtotal</p>
                    <p className='text-base'>${totalLine}</p>
                </div>

                <Divider /> 

                <div className='flex flex-col'>
                    <p className='text-base font-medium'>Delivery</p>
                    <FormControl className='mt-2 pl-5'>
                            <RadioGroup value={selectedRate}>
                                {
                                    shippingRateHandle.length > 0 ?
                                    shippingRateHandle.map((e, i) => (
                                        <div key={i} className='flex flex-row justify-between items-center'>
                                            <FormControlLabel 
                                                control={
                                                    <Radio value={e.handle} onClick={() => handleShippingRadio(e)}/>
                                                }
                                                label={
                                                    <p className="text-sm">{e.title}</p>
                                                } 
                                            />
                                            <p>${e.priceV2.amount}</p>
                                        </div>
                                    ))
                                    :
                                    <div>
                                        <p>No delivery options found. Please confirm your address or make sure you are in the delivery zone.</p>
                                    </div>
                                }
                            </RadioGroup>
                    </FormControl>
                </div>

                <Divider />

                <div className='flex flex-row justify-between'>
                    <p className='text-base font-medium'>Tax (GST)</p>
                    <p className='text-base'>${tax}</p>
                </div>

                <Divider />

                <div className="flex flex-row justify-between">
                    <p className='text-base font-medium'>Total</p>
                    <p className='text-base'>${total}</p>
                </div>
            </div>
            <Button variant="outlined" onClick={handleComplete}>Continue to Payment</Button>
        </div>
    )
}
