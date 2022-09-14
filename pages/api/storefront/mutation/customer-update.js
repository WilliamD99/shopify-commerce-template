import axios from 'axios'
import {storefrontHeaders, storefrontURL} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {
        const params = req.body.data
        const accessToken = params.accessToken
        let updateFields = params.updateFields // return { firstName: "", lastName: "" }
        updateFields.phone = '+1' + updateFields.phone

        updateFields = JSON.stringify(updateFields)
        updateFields = updateFields.replace(/"([^"]+)":/g, '$1:');

        const query = `
        mutation {
            customerUpdate(
                customerAccessToken: "${accessToken}",
                customer: ${updateFields}
            ) {
                customerUserErrors {
                    message
                }
                customer {
                    email 
                    firstName
                    lastName
                    phone
                }
            }
        }
        `
        const data = await axios.post(storefrontURL, query, {
            headers: storefrontHeaders
        })
        console.log(query)
        res.json(data.data)
    }
    catch(e) {
        console.log(e)
        res.json({error: e})
    }
}

export default requests