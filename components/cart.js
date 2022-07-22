import React, {useState, useEffect, useContext} from 'react'
import {useMutation} from '@tanstack/react-query'
import cartContext from '../utils/cartContext'

export default function Cart() {
    // const [cart, setCart] = useState(null)
    const {cart}  = useContext(cartContext)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        let totalItem = 0
        cart.lines.edges.forEach(e => totalItem += e.node.quantity)
        setTotal(totalItem)
    }, [cart])

    return (
        <div>Cart: { total }</div>
    )
}
