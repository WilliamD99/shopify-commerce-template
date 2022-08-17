import React, {useState, useEffect, useContext, useRef} from 'react'
import cartContext from '../../utils/cartContext'
import { BsCart2 } from 'react-icons/bs'
import { gsap } from 'gsap'
import Link from '../common/Link'

export default function CartComponent() {
    const [total, setTotal] = useState(0)
    const {cart, setCart} = useContext(cartContext)
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
            '#total', {
                autoAlpha: 0,
                top: "-0.1rem"
            }, {
                autoAlpha: 1,
                top: "-0.5rem"
            }
        )
    }, [total])

    return (
        <div className='max-w-max relative'>
            <Link href="/cart">
                <BsCart2 className='text-3xl z-5'/> 
                <p id="total" className='absolute -right-2 -top-2 z-10 font-bold rounded-full'>
                    {total}
                </p>
            </Link>
        </div>
    )
}
