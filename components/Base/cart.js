import React, {useState, useEffect, useContext, useRef} from 'react'
import cartContext from '../../utils/cartContext'
import { BsCart2 } from 'react-icons/bs'
import { gsap } from 'gsap'
import CartDrawer from './drawer'
import Badge from '@mui/material/Badge'

export default function CartComponent() {
    const [total, setTotal] = useState(0)
    const [drawerOpen, setDrawer] = useState(false)
    const {cart} = useContext(cartContext)
    const anim = useRef(null)


    useEffect(() => {
        let count = 0
        if (typeof cart === "object") {
            cart.forEach(item => count += item.quantity)
            setTotal(count)
        }
    }, [cart])

    useEffect(() => {
        anim.current = gsap.fromTo(
            '#cart-badge .MuiBadge-badge', {
                autoAlpha: 0,
                top: "-0.1rem"
            }, {
                autoAlpha: 1,
                top: "0rem"
            }
        )
    }, [total])

    return (
        <>
            <div className='max-w-max relative'>
                <button className='flex items-center' onClick={() => setDrawer(!drawerOpen)}>
                    <Badge id="cart-badge" badgeContent={total}>
                        <BsCart2 className='text-xl z-5'/> 
                    </Badge>
                </button>
            </div>
            <CartDrawer open={drawerOpen} setDrawer={setDrawer}/>
        </>
    )
}
