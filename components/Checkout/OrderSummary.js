import React from 'react'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Divider from '@mui/material/Divider'


export default function OrderSummary() {
  return (
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
  )
}
