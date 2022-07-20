import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import DataLoading from '../components/Loading/dataLoading';
import Error from '../components/Error';

export default function Home() {
  const {isLoading, error, data} = useQuery(
    [],
    () => axios
            .get('/api/storefront/get/all')
            .then(res => res.data)
  )

  if (isLoading) return <DataLoading />

  if (error) return <Error message={error.message} />;

  console.log(data)

  return (
    <>
      <p className='text-5xl'>Hello</p>
    </>
  )
}
