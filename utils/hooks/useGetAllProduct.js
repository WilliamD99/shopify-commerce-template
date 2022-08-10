import {useQuery} from '@tanstack/react-query'
import {productAll} from '../api/requests'

export default function useGetAllProduct() {
    let {data, isLoading, isError, error} = useQuery(
        ['all'],
        async () => {
            let data = await productAll()
            return data.data.products.edges
        }
    )

    // Retrieve cart
    return {data, isLoading, isError, error}

}
