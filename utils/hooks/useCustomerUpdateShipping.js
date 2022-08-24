import { customerUpdateShipping } from '../api/requests'
import { useMutation } from '@tanstack/react-query'

let useCustomerUpdateShipping = () => {
    let mutation = useMutation(async(params) => {
        let data = await customerUpdateShipping(params)
        return data.data
    })
    return mutation
}

export default useCustomerUpdateShipping