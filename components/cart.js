import React, {useState, useEffect, useContext} from 'react'
import cartContext from '../utils/cartContext'

export default function CartComponent() {
    // const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const {cart, setCart} = useContext(cartContext)

    useEffect(() => {
        let count = 0
        if (typeof cart === "object") {
            cart.forEach(item => count += item.quantity)
            setTotal(count)
        }
    }, [cart])

    return (
        <div>CartComponent {total}</div>
    )
}
