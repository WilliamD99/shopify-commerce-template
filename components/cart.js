import React, {useState, useEffect, useContext} from 'react'
import {useMutation} from '@tanstack/react-query'
import cartContext from '../utils/cartContext'
import {cartRetrieve} from '../utils/api/requests'
import {decryptText} from '../utils/utils'

export default function Cart() {
    const {cart, setCartStorage}  = useContext(cartContext)
    const [total, setTotal] = useState(0)

    // Retrieve cart
    let cartRetrieveMutation = useMutation(async() => {
        let id = decryptText(sessionStorage.getItem('cart'))
        if (!id) return
        let data = await cartRetrieve({id: id})
        setCartStorage(data.data.cart)
        return data
    })

    // Keeping track of the cart 
    useEffect(() => {
        let totalItem = 0
        cartRetrieveMutation.mutate()
        if (cart !== undefined) {
            cart.lines.edges.forEach(e => totalItem += e.node.quantity)
        }
        setTotal(totalItem)
    }, [cart])

    return (
        <div>Cart: { total }</div>
    )
}
