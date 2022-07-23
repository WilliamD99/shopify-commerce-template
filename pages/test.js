import React, {useEffect, useState} from 'react'

import {useMutation} from '@tanstack/react-query'
import {customerCreate} from '../utils/api/requests'

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


  return (
    <>
      <input id="email" onChange={(e) => onFieldChange(e)} className='border-2 border-black' type="email" placeholder='Email'/>
      <input id="password" onChange={(e) => onFieldChange(e)} className='border-2 border-black' type="password" placeholder='Password'/>
      <button onClick={() => {
        customerCreateMutation.mutate({email: field.email, password: field.password})
      }}>Submit</button>
    </>
  )
}
