
import stripe from '../../../utils/api/stripe'

const request = async (req, res) => {
    try {
        const params = req.body.data
        const id = params.id
        const payment_method = params.method
        // const id = "pi_3LQJZhJF5iU7SUPZ07JPxJw6"
// "pm_1LQfUQJF5iU7SUPZe0f585a3"
        let data = await stripe.paymentIntents.confirm(
            id,
            {
                payment_method: payment_method
            }
        )

        res.json(data)
    }
    catch(e) {
        res.json(e)
    }
}
export default request