import axios from 'axios'
import {storefrontHeaders, storefrontURL} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {
        let params = req.body.data
        let checkoutId = params.checkoutId
        let lineItems = `${
          params.edges.map(e => {
            let field = `{variantId: "${e.merchandiseId}", quantity: ${e.quantity}}`
            return field
          })
        }
        `
        const query = `
        mutation {
            checkoutLineItemsReplace(
                lineItems: [
                    ${lineItems}
                ], 
                checkoutId: "${checkoutId}",
            ) {
              checkout {
                 id
                 lineItems(first:2) {
                   edges {
                     node {
                       id
                       title
                       quantity
                     }
                   }
                 }
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