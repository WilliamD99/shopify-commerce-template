import axios from 'axios'
import {storefrontHeaders, storefrontURL} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {
        const params = req.body.data
        const id = params.id

        let lineItems = `${
          params.edges.map(e => {
            let field = `{variantId: "${e.merchandiseId}", quantity: ${e.quantity}}`
            return field
          })
        }
        `

        const query = `
        mutation {
          cartLinesUpdate(cartId: "${id}", lines: [
            ${lineItems}
          ]) {
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