import React, { useState, useContext, useEffect } from 'react'
import UpdateForm from '../components/User/user-update'
import ShippingForm from '../components/User/shipping-update'
import userContext from '../utils/userContext'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Button from '@mui/material/Button'

import useCustomerDeleteAccessToken from '../utils/hooks/useCustomerDeleteAccessToken'
import { accessTokenExist, accessTokenDelete } from '../utils/utils'

export default function Account() {
  const { user, setUser } = useContext(userContext)
  const [tab, setTab] = useState(0)
  const deleteAccessToken = useCustomerDeleteAccessToken()

  const handleChangeTab = (e, newValue) => {
    setTab(newValue)
  }

  const handleLogout = () => {
    let token = accessTokenExist()
    deleteAccessToken.mutate({accessToken: token})
  }

  useEffect(() => {
    if (deleteAccessToken.data && !deleteAccessToken.isLoading) {
      setUser()
      localStorage.removeItem("items")
      accessTokenDelete()
    }
  }, [deleteAccessToken.isLoading])

  if (!user) return (
    <>
      <p className='text-center text-xl mt-44'>You&apos;re not login yet!</p>
    </>
  )

  return (
    <>
      <p onClick={() => console.log(user)}>Test</p>
      <div className="flex flex-col justify-center items-center">
        <Tabs className='mb-20' value={tab} onChange={handleChangeTab}>
          <Tab label="Personal Info"/>
          <Tab label="Shipping"/>
          <Tab label="Payment"/>
        </Tabs>

        <TabPanel value={tab} index={0}>
          <UpdateForm />
        </TabPanel>

        <TabPanel value={tab} index={1}>
          <ShippingForm />
        </TabPanel>

        <TabPanel value={tab} index={2}>
          <p>Test2</p>
        </TabPanel>
      </div>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  )
}

const TabPanel = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div 
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <div>
        {children}
        </div>
      )}
    </div>
  )
}