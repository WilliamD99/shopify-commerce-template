import React, { useEffect, useContext, useState } from 'react'
import Cart from './cart'
import useCustomerGet from '../../utils/hooks/useCustomerGet'
import { accessTokenExist } from '../../utils/utils'
import userContext from '../../utils/userContext'
import Login from '../User/login'
import Signup from '../User/signup'
import Link from '../common/Link'

import Slide from '@mui/material/Slide'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Search from './search'

export default function Header(props) {
  let customer = useCustomerGet()
  let { user, setUser}  = useContext(userContext)
  let [modalOpen, setModalOpen] = useState(false)

  let headerConditionalDisplay = () => {
    if (!user) return (
      <>
        <Button className='text-white' onClick={() => setModalOpen(true)}>Login</Button>
      </>
    )
    if (!user.firstName) return (
      <p>Hello {user.email}</p>
    )
    return (
      <Link href="/myaccount" className="hover:underline"> 
        <span className="font-semibold ml-1">{user.firstName} {user.lastName}</span>
      </Link>
    )
  }

  useEffect(() => {
    if (!user) {
      let token = accessTokenExist()
      if (token) {
        customer.mutate({accessToken: token})
      }
    }
  }, [])

  useEffect(() => {
    if (customer.data !== undefined) {
      setUser(customer.data.customer)
    }
  }, [customer.isLoading])

  return (
    <>  
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar className='flex justify-between bg-black'>
            <Link href="/">Ecommerce Theme</Link>
            <div className="flex flex-row space-x-5 items-center">
              <Search />
              {headerConditionalDisplay()}
              <Cart />
            </div>

          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Login open={modalOpen} setOpen={setModalOpen}/>
    </>
  )
}

const HideOnScroll = (props) => {
  const { children, window } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}
