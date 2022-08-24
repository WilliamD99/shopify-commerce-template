import { customerUpdate } from '../api/requests'
import { useMutation } from '@tanstack/react-query'

let useCustomerUpdate = () => {
    let mutation = useMutation(async(params) => {
        let data = await customerUpdate(params)
        return data.data
    })
    return mutation
}

export default useCustomerUpdate