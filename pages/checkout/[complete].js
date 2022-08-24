import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Divider from '@mui/material/Divider'

export default function Complete() {
    const router = useRouter()
    const query = router.query
    const [order, setOrder] = useState()

    useEffect(() => {
        if (router.isReady) {
            setOrder(query.order)
        }
    }, [router.isReady])

    if (!router.isReady) return <p>Loading...</p>

    return (
        <>
            <p className='text-2xl font-semibold'>Your order was placed successfully!</p>

            <div className='flex flex-row justify-between mt-10 px-10'>
                <div className='w-2/3'>
                    <p>Order Info</p>
                </div>

                <div className='mr-10 px-8 py-5 flex flex-col w-1/3 bg-slate-100'>
                    <p className='text-xl font-semibold'>Order Summary</p>
                    <div className='flex flex-col space-y-3 my-8'>
                        <div className='flex flex-row justify-between'>
                            <p className='text-base font-medium'>Subtotal</p>
                            <p className='text-base'>$300</p>
                        </div>

                        <Divider /> 

                        <div className='flex flex-col'>
                            <p className='text-base font-medium'>Delivery</p>
                            <FormControl className='mt-2 pl-5'>
                                <RadioGroup defaultValue="standard">
                                    <FormControlLabel value="standard" control={<Radio />} label={<p className="text-sm">Standard</p>} />
                                    <FormControlLabel value="express" control={<Radio />} label={<p className="text-sm">Express</p>} />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        <Divider />

                        <div className="flex flex-row justify-between">
                            <p className='text-base font-medium'>Total</p>
                            <p className='text-base'>$300</p>
                        </div>
                    </div>
                    <Button variant="outlined">Complete</Button>
                </div>
            </div>
        </>
    )
}
