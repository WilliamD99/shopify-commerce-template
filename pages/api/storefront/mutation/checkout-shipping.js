import axios from 'axios'
import {storefrontHeaders, storefrontURL} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {
        let params = req.body.data
        let checkoutId = params.checkoutId
        let shippingAddress = JSON.stringify(params.shippingAddress)

        const query = `
        mutation {
            checkoutShippingAddressUpdateV2(
                shippingAddress: {
                    "lastName": "Doe",
                    "firstName": "John",
                    "address1": "123 Test Street",
                    "province": "QC",
                    "country": "Canada",
                    "zip": "H3K0X2",
                    "city": "Montreal"
                },
                checkoutId: "${checkoutId}",
            ) {
              checkout {
                id
              }
              checkoutUserErrors {
                message
                code
              }
            }
        }
        `
        console.log(query)
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

