import {useQuery} from '@tanstack/react-query'
import {encryptText} from '../utils'
import {cartCreate} from '../api/requests'

let useCartCreate = () => {
    let {data, isLoading, isError, error} = useQuery(
        ['all'],
        async () => {
            if (localStorage.getItem('cart') === null) {
                let items = localStorage.getItem('items')
                let lines = items !== null ? JSON.parse(items) : []
    
                let data = await cartCreate({lines: lines})
                localStorage.setItem('cart', encryptText(data.data.cartCreate.cart.id))
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