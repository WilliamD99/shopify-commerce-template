import { collectionAll } from '../api/requests'
import { useQuery } from '@tanstack/react-query'

let useAllCollection = () => {
    let { data, isLoading, isError, error } = useQuery(
        ['all_collections'],
        async () => {
            let data = await collectionAll()
            return data.data
        }
    )

    return { data, isLoading, isError, error }
}

export default useAllCollection