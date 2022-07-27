import axios from 'axios'
import {storefrontHeaders, storefrontURL} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {        
        const params = req.body.data
        const checkoutId = params.checkoutId
        const accessToken = params.accessToken

        const query = `
            mutation {
                checkoutCustomerAssociateV2(checkoutId: "${checkoutId}", customerAccessToken: "${accessToken}") {
                    checkout {
                        id
                    }
                    checkoutUserErrors {
                        code
                        message
                    }
                    customer {
                        id
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