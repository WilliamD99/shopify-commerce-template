import axios from 'axios'
import {storefrontHeaders, storefrontURL} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {
        const params = req.body.data
        const email = params.email
        const password = params.password
        
        const query = `
        mutation {
            customerCreate(input: {
                email: "${email}",
                password: "${password}",
            }) {
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