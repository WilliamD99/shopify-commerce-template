import axios from 'axios'
import {storefrontHeaders, storefrontURL} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {
        const params = req.body.data
        const id = params.id
        const accessToken = params.accessToken
        let updateFields = params.updateFields // return { firstName: "", lastName: "" }
        updateFields = JSON.stringify(updateFields)
        updateFields = updateFields.replace(/"([^"]+)":/g, '$1:');

        const query = `
        mutation {
            customerAddressUpdate(
                customerAccessToken: "${accessToken}",
                address: ${updateFields},
                id: "${id}"
            ) {
                customerUserErrors {
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