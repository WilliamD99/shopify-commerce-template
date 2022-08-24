import React, { useContext } from 'react'
import cartContext from '../../utils/cartContext'
import Image from '../common/Image'
import Divider from '@mui/material/Divider'

import { cartRemoveItem, cartAdd } from '../../utils/utils'

export default function DrawerList({e}) {
    const { setCart } = useContext(cartContext)
    
    return (
        <>
            <div className="mt-4 mb-2 flex flex-row space-x-5 items-center">
                <div className='relative h-16 w-16'>
                    <Image layout="fill" src={e.image} alt={e.title}/>
                </div>
                <div className='flex flex-col space-y-4'>
                    <div className='flex flex-row justify-between space-x-5'>
                        <p className='font-medium text-sm'>{e.title}</p>
                        <p className='font-medium cursor-pointer' onClick={() => cartRemoveItem({merchandiseId: e.merchandiseId}, setCart)}>x</p>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-row space-x-5'>
                            <button onClick={() => {
                                e.quantity = -1
                                cartAdd(e, setCart)
                            }}>-</button>
                            <p>{e.quantity}</p>
                            <button onClick={() => {
                                e.quantity = 1
                                cartAdd(e, setCart)
                            }}>
                                +
                            </button>
                        </div>
                        <p>${(e.price * e.quantity).toFixed(2)}</p>
                    </div>
                </div>
            </div>
            <Divider />
        </>

    )
}
