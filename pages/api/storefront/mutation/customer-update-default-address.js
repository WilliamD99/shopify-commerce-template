import axios from 'axios'
import {storefrontHeaders, storefrontURL} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {
        const params = req.body.data
        const accessToken = params.accessToken
        const addressId = params.addressId

        const query = `
            mutation {
                customerDefaultAddressUpdate(
                    addressId: "${addressId}",
                    customerAccessToken: "${accessToken}"
                ) {
                    customer {
                        id
                    }
                    customerUserErrors {
                        code
                        message
                    }
                }
            }
        `
        console.log(query)
        const data = await axios.post(storefrontURL, query, {
            headers: storefrontHeaders
        })
        console.log(data.data)
        res.json(data.data)
    }
    catch(e) {
        res.json({error: e})
    }
}

export default requests