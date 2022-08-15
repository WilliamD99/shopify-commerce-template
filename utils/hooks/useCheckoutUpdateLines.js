import {useQuery} from '@tanstack/react-query'
import {checkoutUpdate} from '../api/requests'
import { decryptText } from '../utils'

let useCheckoutUpdateLines = () => {
    let {data, isError, isLoading, error} = useQuery(['checkout-update'], async () => {
        let data
        let checkoutId = sessionStorage.getItem('checkoutId')
        let items = localStorage.getItem('items')
        if (checkoutId !== null && items !== null) {
            items = JSON.parse(items)
            checkoutId = decryptText(checkoutId)
            
            data = await checkoutUpdate({checkoutId: checkoutId, edges: items})
            data = data.data
        }
        else {
            data = {run: false}
        }
        return data
    })

    return {data, isError, isLoading, error}
}

export default useCheckoutUpdateLines