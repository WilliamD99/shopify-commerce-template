import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

let useCreatePaymentIntent = () => {
    let { data, isLoading, isError, error } = useQuery(
        ['create_payment_intent'],
        async () => {
            let items = localStorage.getItem('items')
            let pi = sessionStorage.getItem('pi')
            if (!items) return
            if (pi) return 

            items = JSON.parse(items)
            let amount = 0
            items.forEach(item => amount += (parseFloat(item.price) * item.quantity))

            let data = await axios.post('/api/stripe/payment-intent-create', {
                data: {
                    amount: amount.toFixed(2) * 100,
                    currency: 'cad',
                    method: ['card']
                }
            })
            return data
        }
    )
    return { isError, isLoading, error, data }
}

export default useCreatePaymentIntent