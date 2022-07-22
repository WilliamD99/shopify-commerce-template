import React, {useEffect} from 'react'

export default function Index() {
    useEffect(() => {
        console.log(sessionStorage.getItem('cart'))
    }, [])
  return (
    <div>Index</div>
  )
}
