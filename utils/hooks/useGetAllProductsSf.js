import {useMutation} from '@tanstack/react-query'
import {productAllStorefront} from '../api/requests'

export default function useGetAllProduct() {
    let mutation = useMutation(async(params) => {
        let data = await productAllStorefront(params)
        return data
    })

    // Retrieve cart
    return mutation
}
