import React, {useEffect, useContext} from 'react'
import cartContext from '../utils/cartContext'

import {cartCreate} from '../utils/api/requests'
import {encryptText, decryptObject} from '../utils/utils'
import {useMutation} from '@tanstack/react-query'

export default function Cart() {
  const {cart, setCartStorage, setCart} = useContext(cartContext)

  // Create cart
  let cartCreateMutation = useMutation(async() => {
    let data = await cartCreate()
    sessionStorage.setItem('cart', encryptText(data.data.cartCreate.cart.id))

    setCartStorage(data.data.cartCreate.cart)
    return data.data.cartCreate.cart
  })
  
  // First loaded, create a cart
  useEffect(() => {
    if (sessionStorage.getItem('cart') === null) {
      cartCreateMutation.mutate()
    }
  }, [])

  // Get the cart from sessionStorage to add it to app's state (page refresh problem)
  useEffect(() => {
    if (cart === undefined) {
      // Prevent first loaded
      if (sessionStorage.getItem('cart-items') !== null) {
        let cartNew = decryptObject(sessionStorage.getItem('cart-items'))
        setCart(cartNew)
      }
    }
  }, [cart])

  return (
    <div>Cart</div>
  )
}
