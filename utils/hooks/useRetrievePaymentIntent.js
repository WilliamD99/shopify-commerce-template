import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { decryptText } from '../utils'

let useRetrievePaymentIntent = () => {
    let { data, isLoading, isError, error } = useQuery(
        ['retrieve_payment_intent'],
        async () => {
            let pi = sessionStorage.getItem('client')
            if (!pi) return 

            pi = decryptText(pi).split("_secret_")[0]

            let data = await axios.post('/api/stripe/payment-intent-retrieve', {
                data: { id: pi }
            })
            return data.data
        }
    )
    return { isError, isLoading, error, data }
}

export default useRetrievePaymentIntent