import axios from 'axios'
import {adminHeadersGraphql, adminURLGraphql} from '../../../../utils/api/header'

const requests = async (req, res) => {
  try {
    const params = req.body.data
    const id = params.id

    const query = `
        {
            order(id: "${id}") {
                createdAt
                displayAddress {
                    address1
                    city
                    province
                    zip
                    name
                }
                name
                paymentGatewayNames
            }
        }
    `
    const data = await axios.post(adminURLGraphql, query, {
        headers: adminHeadersGraphql
    })
    res.json(data.data)
  }
  catch(e) {
    res.json({error: e})
  }
}

export default requests