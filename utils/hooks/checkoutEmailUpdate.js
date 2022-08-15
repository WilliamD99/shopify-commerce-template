import { useMutation } from '@tanstack/react-query'
import { checkoutEmailUpdate } from '../api/requests'

let useCheckoutUpdateEmail = () => {
    const checkoutUpdateEmailMutation = useMutation(async(params) => {
        let data = await checkoutEmailUpdate(params)
        return data
    })
    return checkoutUpdateEmailMutation
}

export default useCheckoutUpdateEmail