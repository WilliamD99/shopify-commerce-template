import React, {useEffect, useState} from 'react'

import {useMutation, useQuery} from '@tanstack/react-query'
import {
  customerCreate, 
  customerAll, 
  customerGet, 
  customerUpdate, 
  checkoutCreate, 
  checkoutUpdate, 
  checkoutShippingUpdate, 
  checkoutItemsRemove, 
  checkoutVaultId,
  customerAccessToken,
  checkoutToCustomer
} from '../utils/api/requests'
import { decryptObject, decryptText, encryptText } from '../utils/utils'

export default function Index() {
  const [field, setField] = useState({
    email: "",
    password: ""
  })

  const customerCreateMutation = useMutation(async(params) => {
    let data = await customerCreate(params)
    return data.data
  })

  const onFieldChange = (e) => {
    return [
      field,
      setField(prev => ({
        ...prev,
        [e.target.id]: e.target.value
      }))
    ]
  }

  // Default fetching data
  let {isLoading, error, data} = useQuery(
    ['all'],
    async () => {
      let data = await customerAll()
      return data
    }
  )

  const customerGetMutation = useMutation(async(params) => {
    let data = await customerGet(params)
    console.log(data)
    return data.data
  })

  const customerUpdateMutation = useMutation(async(params) => {
    let data = await customerUpdate(params)
    console.log(data)
    return data.data
  })

  // Create a checkout
  const checkoutCreateMutation = useMutation(async(params) => {
    // if (sessionStorage.getItem('checkoutId') !== null) {
      let data = await checkoutCreate(params)
      sessionStorage.setItem('checkoutId', encryptText(data.data.checkoutCreate.checkout.id))
      console.log(data)
      return data.data
    // }
  })

  // Update lines item in checkout
  const checkoutUpdateMutation = useMutation(async() => {
    let checkoutId = decryptText(sessionStorage.getItem('checkoutId'))
    let lineArr = JSON.parse(sessionStorage.getItem('cart-items')).lines.edges
    let data = await checkoutUpdate({checkoutId: checkoutId, edges: lineArr})
    return data.data
  })
  
  // Update shipping in checkout
  const checkoutShippingMutation = useMutation(async(params) => {
    let checkoutId = decryptText(sessionStorage.getItem('checkoutId'))
    params.checkoutId = checkoutId
    let data = await checkoutShippingUpdate(params)
    return data.data
  })

  // Remove an entire item from the cart
  const checkoutItemsRemoveMutation = useMutation(async(params) => {
    let checkoutId = decryptText(sessionStorage.getItem('checkoutId'))
    params.checkoutId = checkoutId

    let data = await checkoutItemsRemove(params)
    return data.data
  })

  // WIP: for payment
  const checkoutVaultIdMutation = useMutation(async(params) => {
    let checkoutId = decryptText(sessionStorage.getItem('checkoutId'))
    params.checkoutId = checkoutId  
    
    let data = await checkoutVaultId(params)
    return data.data
  })

  // Create accessToken --> work like login
  const customerAccessTokenMutation = useMutation(async(params) => {
    let data = await customerAccessToken(params)
    sessionStorage.setItem('accessToken', encryptText(data.data.customerAccessTokenCreate.customerAccessToken.accessToken))
    return data.data
  })

  // Need to have checkoutId and accessToken in storage to work
  const checkoutToCustomerMutation = useMutation(async(params) => {
    let data = await checkoutToCustomer(params)
    return data
  })

  useEffect(() => {
    customerAccessTokenMutation.mutate({email: 'will.doan@advesa.com', password: "Antimate99."})
    checkoutToCustomerMutation.mutate({checkoutId: decryptText(sessionStorage.getItem('checkoutId')), accessToken: decryptText(sessionStorage.getItem('accessToken'))})
  }, [])

  return (
    <>
      <input id="email" onChange={(e) => onFieldChange(e)} className='border-2 border-black' type="email" placeholder='Email'/>
      <input id="password" onChange={(e) => onFieldChange(e)} className='border-2 border-black' type="password" placeholder='Password'/>
      <button onClick={() => {
        customerCreateMutation.mutate({email: field.email, password: field.password})
      }}>Submit</button>

      <p onClick={() => {
        customerGetMutation.mutate({id: "gid://shopify/Customer/6141938892980"})
      }}>Cus me</p>
      <p onClick={() => {
        customerUpdateMutation.mutate({
          id: "gid://shopify/Customer/5791110168756", 
          fields: [{key: "firstName", value: "John"}, {key: "lastName", value: "Doe"}]
        })
      }}>me</p>

      <p onClick={() => {
        let params = decryptObject(sessionStorage.getItem('cart-items'))
        checkoutCreateMutation.mutate({edges: params.lines.edges})
      }}>Checkout</p>

      <p onClick={() => {
        checkoutUpdateMutation.mutate()
      }}>Update</p>
      
      <p onClick={() => {
        checkoutShippingMutation.mutate({
          shippingAddress: {
            lastName: "Doe",
            firstName: "John",
            address1: "123 Test Street",
            province: "QC",
            country: "Canada",
            zip: "H3K0X2",
            city: "Montreal"
          }
        })
      }}>Shipping</p>

      {/* Check ID again */}
      <p onClick={() => {
        checkoutItemsRemoveMutation.mutate({lines: ["gid://shopify/CartLine/4f56d102c79020431d157401ef58c3a8?cart=c5fd20228723ad8f15ac46bf6458b98d"]})
      }}>Remove</p>

      <p onClick={() => {
        checkoutVaultIdMutation.mutate({test: "test"})
      }}>Vault</p>
    </>
  )
}
