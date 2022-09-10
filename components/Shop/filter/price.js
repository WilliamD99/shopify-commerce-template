import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button'

export default function PriceFilter() {
    const [value, setValue] = useState([0, 1000]);
    const router = useRouter()
    const routerQuery = router.query

    useEffect(() => {
        if (router.isReady && routerQuery.price) {
            let valueURI = routerQuery.price.split(',')
            setValue([parseInt(valueURI[0]), parseInt(valueURI[1])])
        }
    }, [routerQuery])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleApply = () => {
        if (value[0] === 0 && value[1] === 1000) return
        routerQuery.price = `${value[0]},${value[1]}`
        if (!routerQuery.path) routerQuery.path = 'admin'
        if (!routerQuery.reverse) routerQuery.reverse = false
        if (routerQuery.cursor) delete routerQuery.cursor
        
        // router.push(router, undefined)
        router.push({
            pathname: window.location.pathname,
            query: routerQuery
        }, undefined)
    }

    return (
        <>
            <p className='text-lg font-semibold'>
                Price range: { 
                value[0] === 0 && value[1] === 1000 ?
                <></> 
                : 
                <>
                    <span className='font-normal text-base'>${value[0]}</span> - <span className='font-normal text-base'>${value[1]}</span>
                </>
                }
            </p>
            <div className='px-5 mt-2'>
                <Slider
                    getAriaLabel={() => 'Price range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    disableSwap
                    min={0}
                    max={1000}
                    step={10}
                />
            </div>
            <div className='flex justify-end'>
                <Button onClick={handleApply}>Apply</Button>
            </div>
        </>
    )
}
