import React from 'react'
import Cart from './Base/cart'
import Footer from './Base/footer'
import Header from './Base/header'

export default function Layout({children}) {
  return (
    <>
      <Header />
      <Cart />
      <div>{children}</div>
      <Footer />
    </>
  )
}
