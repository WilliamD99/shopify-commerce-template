import { useMutation } from '@tanstack/react-query'
import { checkoutShippingUpdate } from '../api/requests'
import { decryptText } from '../utils'

let useCheckoutShippingUpdate = () => {
    const checkoutUpdateShippingMutation = useMutation(async(params) => {
        let data
        let checkoutId = sessionStorage.getItem('checkoutId')
        if (!checkoutId) return {error: "No checkoutId"}

        checkoutId = decryptText(checkoutId)
        params['checkoutId'] = checkoutId
        data = await checkoutShippingUpdate(params)
        return data
    })
    return checkoutUpdateShippingMutation
}

export default useCheckoutShippingUpdate