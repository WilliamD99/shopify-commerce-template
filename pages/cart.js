import React, {useEffect, useState, useContext} from 'react'
import useCartCreate from '../utils/hooks/useCartCreate'
import cartContext from '../utils/cartContext'

import Single from '../components/Cart/single-product'

export default function Cart() {
  const [cartData, setCartData] = useState()
  const {cart} = useContext(cartContext)

  // Generate cart id in the local storage
  let cartCreate = useCartCreate()

  // For live data update
  useEffect(() => {
    setCartData(JSON.parse(localStorage.getItem('items')))
  }, [cart])

  if (!cartData) return <p>Loading...</p>

  return (
    <>
      <div onClick={() => {
        console.log(cartCreate)
      }}>Cart</div>
      {
        cartData.map((e,i) => (
          <div className='flex flex-row space-x-10' key={i}>
            <Single item={e}/>
          </div>
        ))
      }
    </>
  )
}
