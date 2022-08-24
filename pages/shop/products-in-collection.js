import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Single from '../../components/Shop/single-product'
import { useMutation } from '@tanstack/react-query'
import { productInCollection } from '../../utils/api/requests'
import useProductByCollection from '../../utils/hooks/useProductByCollection'

import Breadcrumbs from '../../components/common/Breadcrumbs'

export default function ShopCollection() {
  const [dataArr, setDataArr] = useState([])
  const router = useRouter()
  const query = router.query
  const product = useProductByCollection()

  const productMutation = useMutation(async(params) => {
    let data = await productInCollection({ cursor: params.cursor, direction: params.direction, id: query.col })
    let edges = data.data.collection.products.edges
    setDataArr(edges)
    return data.data  
  })

  useEffect(() => {
    if (query.col) {
      product.mutate({id: query.col})
    }
  }, [query])

  useEffect(() => {
    if (!product.isLoading && product.data) setDataArr(product.data.collection.products.edges)
  }, [product.isLoading])

  // if (product.isLoading) return <p>Loading ...</p>

  return (
    <>
      <div onClick={() => console.log(product)}>Shop</div>


      <Breadcrumbs path={[
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: `${product.data ? product.data.collection.title : ""}`, path: "#" }
      ]}/>


      <div className='flex flex-row justify-center items-center space-x-2'>
        {
          product.data !== undefined ?
          <>
            <button disabled={!product.data.collection.products.pageInfo.hasPreviousPage} onClick={() => {
              let cursor = dataArr[0].cursor
              productMutation.mutate({cursor: cursor, direction: false})
            }}>Previous</button>
            <button disabled={!product.data.collection.products.pageInfo.hasNextPage} onClick={() => {
              let cursor = dataArr[dataArr.length - 1].cursor
              productMutation.mutate({cursor: cursor, direction: true})
            }}>Next</button>
          </>
          :
          <></>
        }
      </div>
      <div className='grid grid-cols-4 gap-2'>
        {
            dataArr.map((e, i) => (
                <Single key={i} e={e}/>
            ))
        }
      </div>
    </>
  )
}
