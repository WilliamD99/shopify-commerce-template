import axios from 'axios'
import { useMutation } from '@tanstack/react-query'

let useCreatePaymentIntent = () => {
    let mutation = useMutation(async(params) => {
        let data = await axios.post('/api/stripe/payment-intent-create', {
            data: params
        })
        return data
    })
    return mutation
}

export default useCreatePaymentIntent