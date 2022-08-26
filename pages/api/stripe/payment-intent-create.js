import stripe from '../../../utils/api/stripe'

const request = async (req, res) => {
    try {
        const params = req.body.data
        let amount = params.amount
        let currency = params.currency
        let payment_method = params.method

        const data = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            payment_method_types: payment_method,
        });
        res.json(data.client_secret)
    }
    catch(e) {
        res.json(e)
    }
}
export default request