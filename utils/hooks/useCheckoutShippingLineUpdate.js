import { checkoutShippingLineUpdate } from '../api/requests'
import { useMutation } from '@tanstack/react-query'

let useCheckoutShippingLineUpdate = () => {
    let mutation = useMutation(async(params) => {
        let data = await checkoutShippingLineUpdate(params)
        return data.data
    })
    return mutation
}

export default useCheckoutShippingLineUpdate