
import stripe from '../../../utils/api/stripe'

const request = async (req, res) => {
    try {
        let params = req.body.data
        let id = params.id
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