// 3rd party library
import { useState, useEffect, useContext } from 'react';
import {useQuery, useMutation, QueryClient} from '@tanstack/react-query'

// Components
import DataLoading from '../components/Loading/dataLoading';
import Error from '../components/Error';

// Request
import {productInCollection, productAll} from '../utils/api/requests'
// Loading Context
import loadingContext from '../utils/loadingContext';

const queryClient = new QueryClient()

export default function Home() {
  const [dataArr, setDataArr] = useState([])
  const {loading, setLoading} = useContext(loadingContext)

  // Default fetching data
  let {isLoading, error, data} = useQuery(
    ['all'],
    async () => {
      let data
      data = await productAll()
      setDataArr(data.data.products.edges)
      return data
    }
  )

  // Fetch new Data action
  let productInCollectionMutation = useMutation(async() => {
    let data = await productInCollection({id: "gid://shopify/Collection/284230615220"})
    setDataArr(data.data.collection.products.edges)
    return data
  }, {
    onSuccess: () => queryClient.invalidateQueries(['all'])
  })

  // Managing Loading Screen here
  useEffect(() => {
    if (isLoading || productInCollectionMutation.isLoading) {
      console.log('loading')
      setLoading(true)
    }
    if (!isLoading || !productInCollectionMutation.isLoading) {
      // Set timeout for a smooth loading (incase data load too fast)
      setTimeout(() => {
        setLoading(false)
      }, 1200)
    }
  }, [isLoading, productInCollectionMutation.isLoading])

  if (loading) return <DataLoading />

  if (error) return <Error message={error.message} />;
  
  return (
    <>
      <p className='text-5xl' onClick={() => productInCollectionMutation.mutate()}>Hello</p>
      {
        dataArr.map((e, i) => (
          <p key={i}>
            {e.node.id}
          </p>
        ))
      }
    </>
  )
}
