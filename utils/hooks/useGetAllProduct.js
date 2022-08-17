import {useQuery} from '@tanstack/react-query'
import {productAll} from '../api/requests'

export default function useGetAllProduct(params) {
    let {data, isLoading, isError, error} = useQuery(
        ['product_all'],
        async () => {
            let data = await productAll(params)
            return data.data
        }
    )

    // Retrieve cart
    return {data, isLoading, isError, error}

}
