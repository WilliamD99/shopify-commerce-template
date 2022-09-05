import { checkoutUpdate } from '../api/requests'
import { useMutation } from '@tanstack/react-query'
import { decryptText } from '../utils'

let useCheckoutUpdateLinesMutation = () => {
    let mutation = useMutation(async(params) => {
        let data = await checkoutUpdate(params)
        return data.data
    })
    return mutation
}

export default useCheckoutUpdateLinesMutation