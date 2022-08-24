import { customerAccessToken } from '../api/requests'
import { useMutation } from '@tanstack/react-query'

let useCustomerGetAccessToken = () => {
    let mutation = useMutation(async(params) => {
        let data = await customerAccessToken(params)
        return data.data
    })
    return mutation
}

export default useCustomerGetAccessToken