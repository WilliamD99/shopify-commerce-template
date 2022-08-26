import axios from 'axios'
import {storefrontHeaders, storefrontURL} from '../../../../utils/api/header'

const request = async (req, res) => {
    try {
        const params = req.body.data
        let checkoutId = params.checkoutId
        let shippingRateHandle = params.shippingRateHandle

        const query = `
        mutation {
            checkoutShippingLineUpdate(
                checkoutId: "${checkoutId}", 
                shippingRateHandle: "${shippingRateHandle}"
            ) {
            checkout {
                id
                email
                webUrl
                shippingAddress {
                    address1
                }
                shippingLine {
                    handle 
                    title
                }
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



