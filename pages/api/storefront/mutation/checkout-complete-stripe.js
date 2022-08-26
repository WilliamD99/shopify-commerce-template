import axios from 'axios'
import {storefrontHeaders, storefrontURL} from '../../../../utils/api/header'

const request = async (req, res) => {
    try {
        const params = req.body.data
        let checkoutId = params.checkoutId
        // let payment = JSON.stringify(params.payment)
        // const unquoted = payment.replace(/"([^"]+)":/g, '$1:');
        let payment = `
        paymentAmount: {
            amount: "375.80",
            currencyCode: CAD
        },
        idempotencyKey: "123",
        billingAddress: {
            firstName: "John",
            lastName: "Doe",
            address1: "123 Test Street",
            province: "Quebec",
            country: "Canada",
            city: "Montreal",
            zip: "H3K0X2",
        },
        type: STRIPE_VAULT_TOKEN,
        paymentData: "tok_1LaU6rJF5iU7SUPZ0uiRvGrk"
        `

        const query = `
        mutation {
            checkoutCompleteWithTokenizedPaymentV3(
                checkoutId: "${checkoutId}", 
                payment: {
                  ${payment}
                }
            ) {
              checkout {
                id
                webUrl
              }
              checkoutUserErrors {
                code
                message
                field
              }
              payment {
                id
                creditCard {
                  expiryYear
                }
              }
            }
          }
        `
        let data = await axios.post(storefrontURL, query, {
            headers: storefrontHeaders
        })
        res.json({data: data.data})
    }
    catch(e) {
        res.json(e)
    }
}
export default request



