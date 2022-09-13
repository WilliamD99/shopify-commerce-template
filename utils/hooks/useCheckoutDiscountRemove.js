import { useMutation } from '@tanstack/react-query'
import { checkoutRemoveDiscount } from '../api/requests'

let useCheckoutDiscountRemove = () => {
    let mutation = useMutation(async(params) => {
        let data = await checkoutRemoveDiscount(params)
        return data.data
    })
    return mutation
}

export default useCheckoutDiscountRemove