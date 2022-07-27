import axios from "axios";
import Stripe from 'stripe'

Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const request = async (req, res) => {
    try {
        const params = req.body.data
        let amount = params.amount
        let currency = params.currency
        let payment_method = params.method

        const data = await Stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            payment_method_types: payment_method,
        });
        res.json(data)
    }
    catch(e) {
        res.json(e)
    }
}
export default request