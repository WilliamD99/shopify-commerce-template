import stripe from "../../../utils/api/stripe";
import {decryptObject, decryptText} from '../../../utils/utils'

const request = async (req, res) => {
    try {
        const params = req.body.data
        const EncryptNumber = params.number
        const EncryptDetails = params.details

        let number = decryptText(EncryptNumber),
            details = decryptObject(EncryptDetails)

        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
              number: number,
              exp_month: details.month,
              exp_year: details.year,
              cvc: details.code,
            },
        });

        res.json(paymentMethod)
    }
    catch(e) {
        res.json(e)
    }
}
export default request