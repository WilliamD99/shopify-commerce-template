import { customerGet } from '../api/requests'
import { useMutation } from '@tanstack/react-query'

let useCustomerGet = () => {
    let mutation = useMutation(async(params) => {
        let data = await customerGet(params)
        return data.data
    })
    return mutation
}

export default useCustomerGet