import {useQuery} from '@tanstack/react-query'
import {encryptText} from '../utils'
import {cartCreate} from '../api/requests'

let useCartCreate = () => {
    let {data, isLoading, isError, error} = useQuery(
        ['all'],
        async () => {
            if (sessionStorage.getItem('cart') === null) {
                let items = sessionStorage.getItem('items')
                let lines = items !== null ? JSON.parse(items) : []
    
                let data = await cartCreate({lines: lines})
                sessionStorage.setItem('cart', encryptText(data.data.cartCreate.cart.id))
                return data.data.cartCreate.cart
            }
            else {
                return {data: "exist"}
            }
        }
    )

    // Retrieve cart
    return {data, isLoading, isError, error}
}  

export default useCartCreate