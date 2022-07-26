import axios from 'axios'
import {storefrontHeaders, storefrontURL} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {
        const params = req.body.data
        const id = params.id
        const merchandiseId = params.merchandiseId
        const quantity = params.quantity

        const query = `
        mutation {
          cartLinesUpdate(cartId: "${id}", lines: {
            id:"${merchandiseId}",
            quantity:${quantity}
          }) {
            cart {
              totalQuantity
            }
            userErrors {
              field
              message
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