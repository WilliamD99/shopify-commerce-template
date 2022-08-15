import {useQuery} from '@tanstack/react-query'
import {checkoutCreate} from '../api/requests'
// import {decryptObject} from '../utils'

let useCheckoutCreate = () => {
    let {data, isError, isLoading, error} = useQuery(['checkout'], async () => {
        let data
        let checkoutId = sessionStorage.getItem('checkoutId')
        let items = localStorage.getItem('items')
        if (checkoutId === null && items !== null) {
            // items = decryptObject(items)
            items = JSON.parse(items)
            
            data = await checkoutCreate({edges: items})
            data = data.data
        }
        return data
    })

    return {data, isError, isLoading, error}
}

export default useCheckoutCreate