import { customerCreate } from '../api/requests'
import { useMutation } from '@tanstack/react-query'

let useCustomerCreate = () => {
    let mutation = useMutation(async(params) => {
        let data = await customerCreate(params)
        return data.data
    })
    return mutation
}

export default useCustomerCreate