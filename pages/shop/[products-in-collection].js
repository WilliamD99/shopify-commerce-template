import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useProductByCollection from '../../utils/hooks/useProductByCollection'
import SingleProduct from '../../components/Shop/single-product'
import Breadcrumbs from '../../components/common/Breadcrumbs'
import Loading from '../../components/Loading/dataLoading'

import FilterMenu from '../../components/Shop/filterMenu'
import FilterBar from '../../components/Shop/filterBar'

export default function Collection() {
  const router = useRouter()
  const routerQuery = router.query
  const products = useProductByCollection()
  const [dataArr, setDataArr] = useState([])
  const [isNext, setNext] = useState(false)
  const [isPrevious, setPrevious] = useState(false)

  // State for query
  const [query, setQuery] = useState()
  const [sortKey, setSortKey] = useState()
  const [isReverse, setReverse] = useState(false)
  const [cursorNext, setCursorNext] = useState()
  const [cursorLast, setCursorLast] = useState()
  const [direction, setDirection] = useState(true)
  const [path, setPath] = useState('admin')

  useEffect(() => {
    if (router.isReady) {
      console.log(routerQuery)
      if (routerQuery.col && Object.keys(routerQuery).length === 2) {
        products.mutate({id: decodeURIComponent(routerQuery.col)})
      }
    }
  }, [router.isReady, routerQuery])

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

      <div id="shop-container" className='px-10 overflow-hidden'>
        <FilterBar 
          total={products.data ? products.data.collection.productsCount : 0} 
          isLoading={products.isLoading} 
          length={dataArr.length} 
          count={dataArr.length}
          setSortKey={setSortKey}
          setReverse={setReverse}
          setPath={setPath}
        />
        <div className='flex flex-row justify-between mt-5 space-x-8 z-50'>
          <FilterMenu isLoading={products.isLoading} />

          <div className='relative w-9/12 xl:w-10/12'>
            <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-5 gap-y-10">
              {
                products.isLoading ?
                <Loading />
                :
                dataArr.map((e, i) => (
                  <SingleProduct index={i} e={e} key={e.node.title}/>
                ))
              }
            </div>
            <div className="flex justify-center items-center space-x-5 mt-3">
              <button
                disabled={!isPrevious}
                onClick={() => {
                  scroll(0, 0)
                  let cursor = dataArr[0].cursor;
                  products.mutate({ id: query.col, cursor: cursor, direction: false });
                }}
              >
                Previous
              </button>
              <button
                disabled={!isNext}
                onClick={() => {
                  scroll(0, 0)
                  let cursor = dataArr[dataArr.length - 1].cursor;
                  products.mutate({ id: query.col, cursor: cursor, direction: true });
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
