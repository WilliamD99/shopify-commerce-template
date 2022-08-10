import React, {useState, useEffect, useContext, useRef} from 'react'
import {useRouter} from 'next/router'

import { productByHandle } from '../../utils/api/requests'
import {decryptObject, decryptText, cartAdd} from '../../utils/utils'
import {useMutation} from '@tanstack/react-query'

import cartContext from '../../utils/cartContext'

export default function Products() {
  const router = useRouter()
  const {index} = router.query
  const [product, setProduct] = useState()
  const [quantity, setQuantity] = useState(0)
  const [variantId, setVariantId] = useState()
  const {setCart} = useContext(cartContext)
  const inputRef = useRef(0)

  let productByHandleMutation = useMutation(async(params) => {
    let data = await productByHandle(params)
    setProduct(data.data.productByHandle)
  })

  // On change input quantity
  let onChangeInput = (e) => {
    e.preventDefault();
    setQuantity(parseInt(inputRef.current.value))
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
      <div onClick={() => cartAdd({merchandiseId: variantId, quantity: quantity}, setCart)}>Add to cart</div>
    </>
  )
}
