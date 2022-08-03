import React, {useState, useEffect, useContext, useRef} from 'react'
import {useRouter} from 'next/router'

import { productByHandle, cartRetrieve, cartAdd, cartUpdate } from '../../utils/api/requests'
import {decryptObject, decryptText} from '../../utils/utils'
import {useMutation} from '@tanstack/react-query'

import cartContext from '../../utils/cartContext'

export default function Products() {
  const router = useRouter()
  const {index} = router.query
  const [product, setProduct] = useState()
  const [quantity, setQuantity] = useState(0)
  const [variantId, setVariantId] = useState()
  const {setCartStorage} = useContext(cartContext)
  const inputRef = useRef(0)

  let productByHandleMutation = useMutation(async(params) => {
    let data = await productByHandle(params)
    setProduct(data.data.productByHandle)
  })

  // Retrieve cart
  let cartRetrieveMutation = useMutation(async() => {
    let id = decryptText(sessionStorage.getItem('cart'))
    if (!id) return
    let data = await cartRetrieve({id: id})
    setCartStorage(data.data.cart)
    return data
  })

  // Add to cart
  let cartAddMutation = useMutation(async(params) => {
    let cartSession = sessionStorage.getItem('cart')
    if (cartSession !== null) {
      let id = decryptText(cartSession)
      if (!id) return
      await cartAdd({ id: id, merchandiseId: params.merchandiseId, quantity: params.quantity })
      cartRetrieveMutation.mutate()
    }
    else {
      let items = sessionStorage.getItem('items')
      if (items === null) {
        sessionStorage.setItem('items', JSON.stringify([{ merchandiseId: params.merchandiseId, quantity: params.quantity }]))
      }
      else {
        items = JSON.parse(items)
        items.push({ merchandiseId: params.merchandiseId, quantity: params.quantity })
      }
    }
  })

  // Update Cart
  let cartUpdateMutation = useMutation(async(params) => {
    let cartSession = sessionStorage.getItem('cart')
    if (cartSession !== null) {
      let id = decryptText(cartSession)
      if (!id) return
      console.log(params)
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

  // On change input quantity
  let onChangeInput = (e) => {
    e.preventDefault();
    setQuantity(parseInt(inputRef.current.value))
  }

  // Add/Update cart
  let onClickAdd = (e) => {
    // Force user to choose a variant
    if (variantId === undefined) {
      alert('Please choose a variant')
      return
    }
    let cart = decryptObject(sessionStorage.getItem('cart-items'))
    let lines = cart.lines.edges

    // Findout if the product is in the cart or not
    // --> decide whether to add or update
    let product, isInCart, quantityCurrent
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].node.merchandise.id === variantId) {
            product = lines[i].node.id
            isInCart = true
            quantityCurrent = lines[i].node.quantity + quantity
        }
        else {
            isInCart = false
        }
    }
    !isInCart ? 
        cartAddMutation.mutate({merchandiseId: variantId, quantity: quantity})
        :
        cartUpdateMutation.mutate({merchandiseId: product, quantity: quantityCurrent})
    
  }
  
  // Get the product
  useEffect(() => {
    if (index !== undefined) productByHandleMutation.mutate({handle: index})
  }, [index])

  // Keeping track of ref value using state
  useEffect(() => {
    setQuantity(parseInt(inputRef.current.value))
  }, [inputRef.current.value])

  if (product === undefined) return <p>Loading</p>

  return (
    <>
      <div onClick={() => console.log(product)}>Products {index}</div>
      <div onClick={() => console.log(decryptObject(sessionStorage.getItem('cart-items')))}>Items</div>
      <div onClick={() => console.log(quantity)}>Quantity</div>

      {
        product.variants.edges.map((e, i) => (
          <p key={i} onClick={() => setVariantId(e.node.id)}>{e.node.id}</p>
        ))
      }

      <div className='flex flex-row space-x-2'>
        <div onClick={() => inputRef.current.value = parseInt(inputRef.current.value) + 1}>+</div>
        <input type="number" ref={inputRef} defaultValue={0} onChange={onChangeInput}/>
        <div onClick={() => {
          if (quantity > 0) inputRef.current.value = parseInt(inputRef.current.value) - 1
        }}>
            -
        </div>
      </div>
      <div onClick={onClickAdd}>Add to cart</div>
    </>
  )
}
