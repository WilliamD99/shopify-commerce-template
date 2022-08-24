import React, { useState, useEffect, useContext } from 'react'
import userContext from '../../utils/userContext'
import useCustomerUpdate from '../../utils/hooks/useCustomerUpdate'
import { accessTokenExist } from '../../utils/utils'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function UpdateForm() {
  let { user, setUser } = useContext(userContext)
  let [fields, setFields] = useState({
    firstName: "",
    lastName: "",
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
  const handleUpdate = () => {
    let token = { accessToken: accessTokenExist()}
    let params = {...token, updateFields: fields}
    customerUpdate.mutate(params)
  }

  let customerUpdate = useCustomerUpdate()
  useEffect(() => {
    if (!customerUpdate.isLoading && customerUpdate.data) {
      setUser(customerUpdate.data.customerUpdate.customer)
    }
  }, [customerUpdate])

  // Make sure the input doesn't refresh
  useEffect(() => {
    if (user) {
      let info = { firstName: user.firstName, lastName: user.lastName }
      setFields(info)
    }
  }, [user])

  return (
    <>
      <div className='flex flex-col space-y-2 ml-3'>
        <div>
          <TextField id="email" label="Email" defaultValue={user ? user.email : ""}/>
        </div>
        <div>
          <TextField id="firstName" label="First Name" defaultValue={user ? user.firstName : ""} onChange={onFieldChange} />
        </div>
        <div>
          <TextField id="lastName" label="Last Name" defaultValue={user ? user.lastName: ""} onChange={onFieldChange}/>
        </div>
        <div>
            <Button variant='outlined' size='medium' onClick={handleUpdate}>Update</Button>
        </div>
      </div>
    </>
  )
}
