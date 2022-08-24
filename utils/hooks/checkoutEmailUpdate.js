import { useMutation } from '@tanstack/react-query'
import { checkoutEmailUpdate } from '../api/requests'
import { decryptText } from '../utils'

let useCheckoutUpdateEmail = () => {
    const checkoutUpdateEmailMutation = useMutation(async(params) => {
        let data
        let checkoutId = sessionStorage.getItem('checkoutId')
        if (!checkoutId) return {error: "No checkoutId"}

        checkoutId = decryptText(checkoutId)
        params['checkoutId'] = checkoutId
        data = await checkoutEmailUpdate(params)
        return data
    })
    return checkoutUpdateEmailMutation
}

export default useCheckoutUpdateEmail