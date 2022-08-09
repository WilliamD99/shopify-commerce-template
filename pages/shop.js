import { useState, useEffect, useContext } from 'react';
import {useQuery, useMutation, QueryClient, useQueries} from '@tanstack/react-query'
// Request
import {
    productInCollection, 
    productAll, 
    cartCreate, 
    cartRetrieve,
    // cartAdd,
    cartUpdate,
    // cartRemoveItem,
    checkoutCreate
} from '../utils/api/requests'
import {decryptObject, decryptText, encryptObject, encryptText} from '../utils/utils'
import loadingContext from '../utils/loadingContext';
import cartContext from '../utils/cartContext'
// Components
import DataLoading from '../components/Loading/dataLoading';
import Error from '../components/Error';
import SingeProduct from '../components/Shop/single-product';

export default function Shop() {
    const {cart, setCart} = useContext(cartContext)
    const [dataArr, setDataArr] = useState([])

    // Get data
    let test = useMutation(async() => {
        let data = await productAll()
        setDataArr(data.data.products.edges)
    })

  useEffect(() => {
    test.mutate()
  }, [])

  if (test.isLoading) return <DataLoading />
  if (test.isError) return <Error message={test.error}/>

  return (
      <>
          <div onClick={() => console.log(cart)}>Shop</div>
          <div className='grid grid-cols-4 gap-2'>
              {
                  dataArr.map((e, i) => (
                      <SingeProduct key={i} e={e}/>
                  ))
              }
          </div>
      </>
  )
}
