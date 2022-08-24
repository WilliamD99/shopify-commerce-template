import React, { useState, useEffect, useContext } from 'react'
import cartContext from '../../utils/cartContext'

import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Link from '../common/Link'
import DrawerList from './drawerList'

export default function CartDrawer({open, setDrawer}) {
    const [drawerData, setDrawerData] = useState([])
    const [drawerTotal, setDrawerTotal] = useState(0)
    const {cart} = useContext(cartContext)

    const toggleDrawer = (e, open) => {
        if (e.type === 'keydown' && (e.key === 'Tab') || e.key === 'Shift') {
            return
        }
        setDrawer(open)
    }

    useEffect(() => {
        let items = localStorage.getItem('items')
        if (items) {
            let total = 0
            items = JSON.parse(items)
            items.forEach(item => total += item.quantity * item.price)

            setDrawerTotal(total.toFixed(2))
            setDrawerData(items)
        }
    }, [cart])

    return (
        <Drawer anchor='right' open={open} onClose={() => toggleDrawer(false)}>
            <Box className='flex flex-col justify-between w-96 px-8 py-5 h-screen relative'>
                <div>
                    <p className='text-center text-xl font-medium mb-2' onClick={() => console.log(drawerData)}>Cart</p>
                    <Divider className="mb-2"/>
                    <div>
                        {
                            cart.length > 0 ?
                            cart.map((e, i) => (
                                <DrawerList key={i} e={e} />
                            ))
                            :
                            <div className='mt-5'>
                                <p className="text-center">No products in the cart</p>
                            </div>
                        }
                    </div>
                </div>
                <div className='flex flex-col space-y-3 mt-2'>
                    <div className='flex flex-row justify-between'>
                        <p className='font-medium'>Subtotal:</p>
                        <p className='font-medium'>${drawerTotal}</p>
                    </div>
                    <Button disabled={cart.length > 0 ? false : true} className='rounded-xl' variant="outlined">
                        <Link href="/cart">View Cart</Link>
                    </Button>
                    <Button disabled={cart.length > 0 ? false : true} className='rounded-xl' variant="outlined">
                        <Link href="/checkout/review">Checkout</Link>
                    </Button>
                </div>
            </Box>
        </Drawer>
    )
}
