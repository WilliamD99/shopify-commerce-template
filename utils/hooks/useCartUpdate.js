import { cartUpdate } from "../api/requests";
import { useQuery } from "@tanstack/react-query";
import { decryptText } from "../utils";

let useCartUpdate = () => {
    let { data, isLoading, isError, error } = useQuery(
        ['cart_update'],
        async () => {
            let data
            let cart = sessionStorage.get('cart')
            let items = localStorage.get('items')
            if (cart) {
                cart = decryptText(cart)
                data = await cartUpdate({ id: cart, edges: items })
            }
            
            return data
        }
    )
    return { data, isLoading, isError, error }
}

export default useCartUpdate