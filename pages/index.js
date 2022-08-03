// 3rd party library
import { useState, useEffect, useContext } from 'react';
import {useQuery, useMutation, QueryClient, useQueries} from '@tanstack/react-query'

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
  cartRemoveItem,
  checkoutCreate
} from '../utils/api/requests'
import {decryptObject, decryptText, encryptObject, encryptText} from '../utils/utils'
// Loading Context
import loadingContext from '../utils/loadingContext';
import cartContext from '../utils/cartContext'

import Cart from '../components/cart';
import SingeProduct from '../components/Shop/single-product';

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
    // if ()
    let id = decryptText(cartSession)
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
      // First loaded the storage doesnt have anything
      if (sessionStorage.getItem('cart-items') !== null) {
        let cartNew = decryptObject(sessionStorage.getItem('cart-items'))
        setCart(cartNew)
      }
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
      <div className='grid grid-cols-4 gap-2'>
        {
          dataArr.map((e, i) => (
            <SingeProduct key={i} e={e} add={cartAddMutation.mutate} update={cartUpdateMutation.mutate} remove={cartRemoveItemMutation.mutate}/>
          ))
        }
      </div>
    </>
  )
}
