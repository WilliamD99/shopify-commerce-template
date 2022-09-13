import {useEffect, useState} from 'react'
// Style
import "../public/styles/tailwind.css"
import "../public/styles/index.css"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// Library
import Helmet from "react-helmet";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

import loadingContext from "../utils/loadingContext";
import cartContext from '../utils/cartContext'
import userContext from '../utils/userContext'

import Layout from '../components/layout'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState([])
  const [user, setUser] = useState()

  useEffect(() => {
    let items = JSON.parse(localStorage.getItem('items'))
    if (items !== null) {
      setCart(JSON.parse(localStorage.getItem('items')))
    }
  }, [])

  return (
    <>
      <Helmet>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="keywords" content="" />
        {/* Need change */}
        <meta name="description" content="" />
        <meta name="author" content="willD" />
        <meta
          name="apple-mobile-web-app-title"
          content="" // Content here
        />
        <meta name="application-name" content="" />
        <meta name="msapplication-TileColor" content="#cc9966" />
        <meta
          name="msapplication-config"
          content="images/icons/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Will</title>
        <link rel="manifest" href="images/icons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="images/icons/safari-pinned-tab.svg"
          color="#666666"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Helmet>
      <QueryClientProvider client={queryClient}>
        <userContext.Provider value={{user, setUser}}>
          <cartContext.Provider value={{cart, setCart}}>
            <loadingContext.Provider value={{loading, setLoading}}>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
            </loadingContext.Provider>
          </cartContext.Provider>
        </userContext.Provider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
