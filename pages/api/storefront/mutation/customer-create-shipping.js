import axios from 'axios'
import {storefrontHeaders, storefrontURL} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {
        const params = req.body.data
        const accessToken = params.accessToken
        let updateFields = params.updateFields // return { firstName: "", lastName: "" }
        updateFields = JSON.stringify(updateFields)
        updateFields = updateFields.replace(/"([^"]+)":/g, '$1:');

        const query = `
        mutation {
            customerAddressCreate(
                customerAccessToken: "${accessToken}",
                address: ${updateFields}
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
        console.log(data.data)
        res.json(data.data)
    }
    catch(e) {
        console.log(e)
        res.json({error: e})
    }
}

export default requests