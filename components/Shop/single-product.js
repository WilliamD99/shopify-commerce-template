import React, { useContext, useState } from 'react'
import { cartAdd } from '../../utils/utils'

import Link from '../common/Link'
import Image from '../common/Image'
import Button from '@mui/material/Button'

import cartContext from '../../utils/cartContext'

export default function SingeProduct({e}) {
    const {setCart} = useContext(cartContext)

    return (
        <div className='flex flex-col justify-center items-center space-y-5 mb-5 bg-slate-50 px-2 py-5 product'>
            <div className='relative w-full h-44'>
                <Image alt={e.node.title} src={e.node.featuredImage.url} layout="fill"/>
            </div>
            <a className='text-center text-xl font-semibold' href={`/product/${e.node.handle}`}>{e.node.title}</a>
            <p className='text-base'>
                {
                    parseFloat(e.node.priceRangeV2.minVariantPrice.amount) === parseFloat(e.node.priceRangeV2.maxVariantPrice.amount) ?
                    `$${parseFloat(e.node.priceRangeV2.minVariantPrice.amount).toFixed(2)}`
                    :
                    `$${parseFloat(e.node.priceRangeV2.minVariantPrice.amount)} - $${parseFloat(e.node.priceRangeV2.maxVariantPrice.amount)}` 
                }
            </p>
            {
                e.node.variants.edges.length > 1 ?
                <Button variant="outlined" className="rounded-lg">
                    <Link href={`/product/${e.node.handle}`}>Select Options</Link>
                </Button>
                :
                <Button variant="outlined" className="rounded-lg">
                    Add to cart
                </Button>
            }
        </div>
    )
}
