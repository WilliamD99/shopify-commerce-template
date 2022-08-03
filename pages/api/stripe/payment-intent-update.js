
import stripe from '../../../utils/api/stripe'

const request = async (req, res) => {
    try {
        const params = req.body.data
        const id = params.id
        const updateFields = params.update
        // object: { amount: 500, .... }

        let data = await stripe.paymentIntents.update(
            id,
            updateFields
        )

        res.json(data)
    }
    catch(e) {
        res.json(e)
    }
}
export default request