import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

let useGetTotal = () => {
    let { data, isLoading, isError, error } = useQuery(
        ['total'],
        async () => {
            let data = await axios.get('/api/admin/query/count')
            return data.data
        }
    )
    return { data, isLoading, isError, error }
}

export default useGetTotal