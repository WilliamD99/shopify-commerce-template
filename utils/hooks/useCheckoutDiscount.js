import { useMutation } from '@tanstack/react-query'
import { checkoutAddDiscount } from '../api/requests'

let useCheckoutDiscount = () => {
    let mutation = useMutation(async(params) => {
        let data = await checkoutAddDiscount(params)
        return data.data
    })
    return mutation
}

export default useCheckoutDiscount