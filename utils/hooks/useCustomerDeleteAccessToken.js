import { customerAccessTokenDelete } from '../api/requests'
import { useMutation } from '@tanstack/react-query'

const useCustomerDeleteAccessToken = () => {
    let mutation = useMutation(async (params) => {
        let data = await customerAccessTokenDelete(params)
        return data
    })
    return mutation
}

export default useCustomerDeleteAccessToken