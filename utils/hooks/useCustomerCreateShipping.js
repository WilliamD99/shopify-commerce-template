import { customerCreateShipping } from '../api/requests'
import { useMutation } from '@tanstack/react-query'

let useCustomerCreateShipping = () => {
    let mutation = useMutation(async(params) => {
        let data = await customerCreateShipping(params)
        return data.data
    })
    return mutation
}

export default useCustomerCreateShipping