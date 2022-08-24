import axios from 'axios'
import {storefrontHeaders, storefrontURL} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {        
        const params = req.body.data
        const accessToken = params.accessToken

        const query = `
        mutation {
            customerAccessTokenDelete(customerAccessToken: "${accessToken}") {
                deletedAccessToken
                userErrors {
                    field
                    message
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