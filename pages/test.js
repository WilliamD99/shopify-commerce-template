import React, {useEffect, useState} from 'react'

import {useMutation, useQuery} from '@tanstack/react-query'
import {customerCreate, customerAll, customerGet, customerUpdate, checkoutCreate, checkoutUpdate, checkoutShippingUpdate} from '../utils/api/requests'

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
      // console.log(data)
      return data
    }
  )

  const customerGetMutation = useMutation(async(params) => {
    let data = await customerGet(params)
    console.log(data.data)
    return data.data
  })

  const customerUpdateMutation = useMutation(async(params) => {
    let data = await customerUpdate(params)
    console.log(data)
    return data.data
  })

  const checkoutCreateMutation = useMutation(async(params) => {
    let data = await checkoutCreate(params)
    sessionStorage.setItem('checkoutId', data.data.checkoutCreate.checkout.id)
    return data.data
  })

  const checkoutUpdateMutation = useMutation(async() => {
    let checkoutId = sessionStorage.getItem('checkoutId')
    let lineArr = JSON.parse(sessionStorage.getItem('cart-items')).lines.edges
    let data = await checkoutUpdate({checkoutId: checkoutId, edges: lineArr})
    return data.data
  })

  const checkoutShippingMutation = useMutation(async(params) => {
    let checkoutId = sessionStorage.getItem('checkoutId')
    params.checkoutId = checkoutId
    console.log(params)
    let data = await checkoutShippingUpdate(params)
    console.log(data)
    return data.data
  })

  useEffect(() => {

  }, [])

  return (
    <>
      <input id="email" onChange={(e) => onFieldChange(e)} className='border-2 border-black' type="email" placeholder='Email'/>
      <input id="password" onChange={(e) => onFieldChange(e)} className='border-2 border-black' type="password" placeholder='Password'/>
      <button onClick={() => {
        customerCreateMutation.mutate({email: field.email, password: field.password})
      }}>Submit</button>

      <p onClick={() => {
        customerGetMutation.mutate({id: "gid://shopify/Customer/5791110168756"})
      }}>Click me</p>
      <p onClick={() => {
        customerUpdateMutation.mutate({
          id: "gid://shopify/Customer/5791110168756", 
          fields: [{key: "firstName", value: "John"}, {key: "lastName", value: "Doe"}]
        })
      }} >me</p>

      <p onClick={() => {
        let params = JSON.parse(sessionStorage.getItem('cart-items'))
        console.log(params)
        checkoutCreateMutation.mutate({edges: params.lines.edges})
      }}>Checkout</p>

      <p onClick={() => {
        checkoutUpdateMutation.mutate()
      }}>Update</p>
      
      <p onClick={() => {
        checkoutShippingMutation.mutate({
          shippingAddress: {
            "lastName": "Doe",
            "firstName": "John",
            "address1": "123 Test Street",
            "province": "QC",
            "country": "Canada",
            "zip": "H3K0X2",
            "city": "Montreal"
          }
        })
      }}>Shipping</p>
    </>
  )
}
