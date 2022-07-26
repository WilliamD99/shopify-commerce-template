// 3rd party library
import { useState, useEffect, useContext } from 'react';
import {useQuery, useMutation, QueryClient} from '@tanstack/react-query'

// Components
import DataLoading from '../components/Loading/dataLoading';
import Error from '../components/Error';

// Request
import {
  productInCollection, 
  productAll, 
  cartCreate, 
  cartRetrieve,
  cartAdd,
  cartUpdate,
  cartRemoveItem
} from '../utils/api/requests'
// Loading Context
import loadingContext from '../utils/loadingContext';
import cartContext from '../utils/cartContext'

import Cart from '../components/cart';

const queryClient = new QueryClient()

export default function Home() {
  const [dataArr, setDataArr] = useState([])
  const {loading, setLoading} = useContext(loadingContext)
  const {cart, setCartStorage, setCart} = useContext(cartContext)

  useEffect(() => {
    if (sessionStorage.getItem('cart') === null) {
      cartCreateMutation.mutate()
    }
  }, [])

  // Default fetching data
  let {isLoading, error, data} = useQuery(
    ['all'],
    async () => {
      let data
      data = await productAll()
      setDataArr(data.data.products.edges)
      return data
    }
  )

  // Fetch new Data action
  let productInCollectionMutation = useMutation(async() => {
    let data = await productInCollection({id: "gid://shopify/Collection/284230615220"})
    setDataArr(data.data.collection.products.edges)
    return data
  }, {
    onSuccess: () => queryClient.invalidateQueries(['all'])
  })

  // Create cart
  let cartCreateMutation = useMutation(async() => {
    let data = await cartCreate()
    sessionStorage.setItem('cart', data.data.cartCreate.cart.id)
    setCartStorage(data.data.cartCreate.cart)
    // sessionStorage.setItem('cart-items', JSON.stringify(data.data.cartCreate.cart))
    return data.data.cartCreate.cart
  })

  // Retrieve cart
  let cartRetrieveMutation = useMutation(async() => {
    let id = sessionStorage.getItem('cart')
    if (!id) return
    let data = await cartRetrieve({id: id})

    setCartStorage(data.data.cart)
    // sessionStorage.setItem('cart-items', JSON.stringify(data.data.cart))
    // console.log(data.data.cart)
    return data
  })

  // Add to cart
  let cartAddMutation = useMutation(async(params) => {
    let id = sessionStorage.getItem('cart')
    if (!id) return
    let data = await cartAdd({ id: id, merchandiseId: params.merchandiseId, quantity: params.quantity })
    cartRetrieveMutation.mutate()

    return data.data
  })

  // Update Cart
  let cartUpdateMutation = useMutation(async(params) => {
    let id = sessionStorage.getItem('cart')
    if (!id) return
    let data = await cartUpdate({id: id, merchandiseId: params.merchandiseId, quantity: params.quantity})
    cartRetrieveMutation.mutate()
    return data.data
  })

  // Remove item in cart
  let cartRemoveItemMutation = useMutation(async(params) => {
    let id = sessionStorage.getItem('cart')
    if (!id) return
    let data = await cartRemoveItem({ id: id, merchandiseId: params.merchandiseId })
    cartRetrieveMutation.mutate()
    return data.data
  })

  // Managing Loading Screen here
  useEffect(() => {
    if (isLoading || productInCollectionMutation.isLoading) {
      setLoading(true)
    }
    if (!isLoading || !productInCollectionMutation.isLoading) {
      // Set timeout for a smooth loading (incase data load too fast)
      setTimeout(() => {
        setLoading(false)
      }, 1200)
    }
  }, [isLoading, productInCollectionMutation.isLoading])

  // Get the cart from sessionStorage to add it to app's state (page refresh problem)
  useEffect(() => {
    if (cart === undefined) {
      let cartNew = JSON.parse(sessionStorage.getItem('cart-items'))
      setCart(cartNew)
    }
  }, [cart])

  if (loading) return <DataLoading />

  if (error) return <Error message={error.message} />;
  
  return (
    <>
      <Cart />
      <p onClick={() => {
        cartRetrieveMutation.mutate()
      }}>Click me</p>
      <p className='text-5xl' onClick={() => productInCollectionMutation.mutate()}>Hello</p>
      {
        dataArr.map((e, i) => (
          <div className='flex flex-row mb-5' key={i}>
            <p>{e.node.id}</p>
            <div>
              {
                // e.node.varians
                e.node.variants.edges.map((item, index) => (
                  <div key={index}>
                    <p>
                      {item.node.id}
                    </p>
                    <button className='border-2 border-black px-2' onClick={() => {
                      let cart = JSON.parse(sessionStorage.getItem('cart-items'))
                      let lines = cart.lines.edges

                      // Findout if the product is in the cart or not
                      // --> decide whether to add or update
                      let product, isInCart, quantityCurrent
                      for (let i = 0; i < lines.length; i++) {
                        if (lines[i].node.merchandise.id === item.node.id) {
                          product = lines[i].node.id
                          isInCart = true
                          quantityCurrent = lines[i].node.quantity + 1
                        }
                        else {
                          isInCart = false
                        }
                      }
                      !isInCart ? 
                        cartAddMutation.mutate({merchandiseId: item.node.id, quantity: 1})
                        :
                        cartUpdateMutation.mutate({merchandiseId: product, quantity: quantityCurrent})
                      
                    }}>
                      Click me
                    </button>
                    <button className='border-2 border-black px-2 ml-2' onClick={() => {
                      let cart = JSON.parse(sessionStorage.getItem('cart-items'))
                      let lines = cart.lines.edges

                      let product, isInCart, quantityCurrent
                      for (let i = 0; i < lines.length; i++) {
                        if (lines[i].node.merchandise.id === item.node.id) {
                          product = lines[i].node.id
                          isInCart = true
                          quantityCurrent = lines[i].node.quantity - 1
                        }
                        else {
                          isInCart = false
                        }
                      }
                      
                      if (isInCart) cartUpdateMutation.mutate({merchandiseId: product, quantity: quantityCurrent})
                    }}>
                      Remove 1
                    </button>
                    <button className='border-2 border-black px-2 ml-2' onClick={() => {
                      let cart = JSON.parse(sessionStorage.getItem('cart-items'))
                      let lines = cart.lines.edges

                      // Findout if the product is in the cart or not
                      // --> decide whether to add or update
                      let product, isInCart
                      for (let i = 0; i < lines.length; i++) {
                        if (lines[i].node.merchandise.id === item.node.id) {
                          product = lines[i].node.id
                          isInCart = true
                        }
                        else {
                          isInCart = false
                        }
                      }
                      if (isInCart) cartRemoveItemMutation.mutate({merchandiseId: product})
                    }}>
                      Remove
                    </button>
                  </div>
                ))
              }
            </div>
          </div>
        ))
      }
    </>
  )
}
