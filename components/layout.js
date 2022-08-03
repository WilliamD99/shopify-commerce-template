import React from 'react'
import Cart from './cart'

export default function Layout({children}) {
  return (
    <>
      <Cart />
      <div>{children}</div>
    </>
  )
}
