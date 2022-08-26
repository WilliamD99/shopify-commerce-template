import axios from 'axios'
import {storefrontHeaders, storefrontURL} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {
        let params = req.body.data
        let checkoutId = params.checkoutId
        let shippingAddress = JSON.stringify(params.address)
        shippingAddress = shippingAddress.replace(/"([^"]+)":/g, '$1:');

        const query = `
        mutation {
            checkoutShippingAddressUpdateV2(
                shippingAddress: ${shippingAddress},
                checkoutId: "${checkoutId}",
            ) {
              checkout {
                id
                webUrl
                availableShippingRates {
                  shippingRates {
                      handle
                      priceV2 {
                          amount
                      }
                      title
                  }
                }
              }
              checkoutUserErrors {
                message
                code
              }
            }
        }
        `
        const data = await axios.post(storefrontURL, query, {
            headers: storefrontHeaders
        })
        res.json(data.data)
    }
    catch(e) {
        res.json({error: e})
    }
}

export default requests

