import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useProductByCollection from '../../utils/hooks/useProductByCollection'
import SingleProduct from '../../components/Shop/single-product'
import Breadcrumbs from '../../components/common/Breadcrumbs'
import Loading from '../../components/Loading/dataLoading'

export default function Collection() {
  const router = useRouter()
  const query = router.query
  const products = useProductByCollection()
  const [dataArr, setDataArr] = useState([])
  const [isNext, setNext] = useState(false)
  const [isPrevious, setPrevious] = useState(false)

  useEffect(() => {
    if (router.isReady) {
      if (query.col) {
        products.mutate({id: query.col})
      }
    }
  }, [router.isReady])

  useEffect(() => {
    setDataArr([])
    if (products.data) {
      setDataArr(products.data.collection.products.edges)
      setNext(products.data.collection.products.pageInfo.hasNextPage)
      setPrevious(products.data.collection.products.pageInfo.hasPreviousPage)
    }
  }, [products.isLoading])
  

  return (
    <>
      <Breadcrumbs path={[
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: `Collection - ${products.data ? products.data.collection.title : ""}`, path: "#" }
      ]}/>

      <div className="flex justify-center items-center space-x-5">
        <button
          disabled={!isPrevious}
          onClick={() => {
            let cursor = dataArr[0].cursor;
            products.mutate({ id: query.col, cursor: cursor, direction: false });
          }}
        >
          Previous
        </button>
        <button
          disabled={!isNext}
          onClick={() => {
            let cursor = dataArr[dataArr.length - 1].cursor;
            products.mutate({ id: query.col, cursor: cursor, direction: true });
          }}
        >
          Next
        </button>
      </div>

      <div className='flex justify-center'>
        <div className='w-11/12'>
          <div className="grid grid-cols-4 gap-5">
            {
              products.isLoading ?
              <Loading />
              :
              dataArr.map((e, i) => (
                <SingleProduct index={i} e={e} key={e.node.title}/>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}
