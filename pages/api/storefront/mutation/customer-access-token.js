import axios from 'axios'
import { storefrontHeaders, storefrontURL } from '../../../../utils/api/header'

const requests = async (req, res) => {
  try {
    const params = req.body.data
    const email = params.email
    const password = params.password

    const query = `
        mutation {
            customerAccessTokenCreate(input: {
                email: "${email}",
                password: "${password}"
            }) {
              customerAccessToken {
                accessToken
                expiresAt
              }
              customerUserErrors {
                field
                code
                message
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
  catch (e) {
    console.log(e)
    res.json({ error: e })
  }
}

export default requests