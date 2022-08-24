import React, {useState, useEffect, useContext, useRef} from 'react'
import {useRouter} from 'next/router'

import { productByHandle } from '../../utils/api/requests'
import { cartAdd } from '../../utils/utils'
import {useMutation} from '@tanstack/react-query'
import Image from 'next/image'
import cartContext from '../../utils/cartContext'
import Breadcrumbs from '../../components/common/Breadcrumbs'

export default function Products() {
  const router = useRouter()
  const {index} = router.query
  const [product, setProduct] = useState()
  const [quantity, setQuantity] = useState(0)
  const [variantId, setVariantId] = useState()
  const {setCart} = useContext(cartContext)
  const [displayPrice, setDisplayPrice] = useState(0)
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
  let handleVariantClick = (e) => {
    setVariantId(e.node.id)
    setDisplayPrice(e.node.price)
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
      <Breadcrumbs path={[
        { name: "Home", path: "/" },
        { name: `${product.title}`, path: "#" }
      ]}/>

      <p onClick={() => console.log(product)}>Test</p>

      <div className='flex flex-row'> 
        <div>
          {
            product.images.edges.map((e, i)=> (
              <div className='relative w-56 h-56' key={i}>
                <Image layout="fill" src={e.node.src}/>
              </div>
            ))
          }
        </div>
        <div className='flex flex-col space-y-5'>
          <p className='text-2xl font-semibold'>Products {product.title}</p>
          <p className='text-xl'>{product.description}</p>

          <div className='flex flex-row'>
            {
              product.variants.edges.map((e, i) => (
                <button className='bg-slate-200 rounded-full py-2 px-1' key={i} onClick={() => handleVariantClick(e)}>
                  <p className='text-sm'>{e.node.title}</p>
                </button>
              ))
            }
          </div>

          <div className='flex flex-row space-x-2'>
            <button onClick={() => {
              if (quantity > 0) inputRef.current.value = parseInt(inputRef.current.value) - 1
            }}>
              -
            </button>
            <input className='text-center' type="number" ref={inputRef} defaultValue={0} onChange={onChangeInput}/>
            <button onClick={() => inputRef.current.value = parseInt(inputRef.current.value) + 1}>+</button>
          </div>
          <div>
            <button className='bg-zinc-300 px-5 py-2 rounded-full' disabled={variantId ? false : true} onClick={() => cartAdd({merchandiseId: variantId, quantity: quantity, image: product.featuredImage.url, title: product.title}, setCart)}>
              Add to cart | ${displayPrice}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
