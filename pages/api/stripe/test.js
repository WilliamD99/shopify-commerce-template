import stripe from '../../../utils/api/stripe'

const request = async (req, res) => {
    try {
        const id = "pi_3LQJZhJF5iU7SUPZ07JPxJw6"
        let data = await stripe.paymentIntents.retrieve(
            id
        )
        res.json(data)
    }
    catch(e) {
        res.json(e)
    }
}
export default request