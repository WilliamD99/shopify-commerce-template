import React, { useEffect, useState } from 'react'
import useCustomerCreate from '../../utils/hooks/useCustomerCreate'

export default function Signup() {
  const [fields, setFields] = useState({
    email: "",
    password: ""
  })
  const onFieldChange = (e) => {
    return [
      fields,
      setFields({
        ...fields,
        [e.target.id]: e.target.value
      })
    ]
  }

  let customerCreate = useCustomerCreate()
  const handleCreate = () => {
    customerCreate.mutate({ email: fields.email, password: fields.password })
  }

  useEffect(() => {
    if (!customerCreate.isLoading && customerCreate.data !== undefined) {
      let data = customerCreate.data.customerCreate
      if (data.customerUserErrors.length > 0) {
        console.log(customerCreate.data.customerCreate.customerUserErrors[0].message)
      }
      if (data.customerUserErrors.length === 0) {
        console.log('Success')
      }
    }
  }, [customerCreate.isLoading])

  return (
    <>
      <input onChange={onFieldChange} id="email" type="email" placeholder='Email'/>
      <input onChange={onFieldChange} id="password" type="password" placeholder='Password'/>
      <div onClick={handleCreate}>Logout</div>
    </>
  )
}
