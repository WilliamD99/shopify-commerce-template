import {useMutation} from '@tanstack/react-query'
import {cartRetrieve} from './api/requests'
import {decryptText} from './utils'

let useTest = () => {
    // Retrieve cart
    let cartRetrieveMutation = useMutation(async() => {
        let id = decryptText(sessionStorage.getItem('cart'))
        if (!id) return
        let data = await cartRetrieve({id: id})

        // setCartStorage(data.data.cart)
        return data.data.cart
    })
    return cartRetrieveMutation
}

export {useTest}