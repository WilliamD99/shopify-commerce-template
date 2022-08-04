import React, {useEffect, useContext} from 'react'
import cartContext from '../utils/cartContext'

import {cartCreate, cartRemoveItem, cartUpdate} from '../utils/api/requests'
import {encryptText, decryptObject, decryptText} from '../utils/utils'
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

  // Retrieve cart
  let cartRetrieveMutation = useMutation(async() => {
    let id = decryptText(sessionStorage.getItem('cart'))
    if (!id) return
    let data = await cartRetrieve({id: id})

    setCartStorage(data.data.cart)
    return data
  })

  // Update Cart
  let cartUpdateMutation = useMutation(async(params) => {
    let cartSession = sessionStorage.getItem('cart')
    if (cartSession !== null) {
      let id = decryptText(cartSession)
      if (!id) return
      await cartUpdate({id: id, merchandiseId: params.merchandiseId, quantity: params.quantity})
      cartRetrieveMutation.mutate()
    }
    else {
      let items = JSON.parse(sessionStorage.getItem('items'))
      let targetItemIndex = items.findIndex(item => item.merchandiseId === params.merchandiseId)
      items[targetItemIndex] = params.quantity
      sessionStorage.setItem('items', JSON.stringify(items))
    }
  })

  // Remove item in cart
  let cartRemoveItemMutation = useMutation(async(params) => {
    let cartSession = sessionStorage.getItem('cart')
    // if ()~
    let id = decryptText(cartSession)
    if (!id) return
    let data = await cartRemoveItem({ id: id, merchandiseId: params.merchandiseId })
    cartRetrieveMutation.mutate()
    return data.data
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
    <>
      <div>Cart</div>
      {
        cart !== undefined ?
        cart.lines.edges.map((e, i) => (
            <div key={i}>
                <p>{e.node.id}</p>
                <p>{e.node.quantity}</p>
            </div>
        ))
        :
        <></>
      }
    </>
  )
}
