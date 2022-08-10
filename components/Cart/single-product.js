import React, {useContext} from 'react'
import cartContext from '../../utils/cartContext'
import { cartAdd, cartRemoveItem } from '../../utils/utils'

export default function Single({item}) {
    const {setCart} = useContext(cartContext)

    return (
        <>
            <p>{item.merchandiseId}</p>
            <p>{item.quantity}</p>
            <p>{item.price}</p>
            <p>{parseFloat(item.quantity) * parseFloat(item.price)}</p>
            <p onClick={() => cartAdd({merchandiseId: item.merchandiseId, quantity: 1, price: item.price}, setCart)}>Increase</p>
            <p onClick={() => cartAdd({merchandiseId: item.merchandiseId, quantity: -1, price: item.price}, setCart)}>Decrease</p>
            <p onClick={() => cartRemoveItem({merchandiseId: item.merchandiseId}, setCart)}>Remove</p>
        </>
    )
}
