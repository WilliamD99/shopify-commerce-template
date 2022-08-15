import axios from 'axios'
import {storefrontHeaders, storefrontURL} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {
        let params = req.body.data
        let lineItems = `${
            params.edges.map(e => {
              let field = `{variantId: "${e.merchandiseId}", quantity: ${e.quantity}}`
              return field
            })
          }
        `
        const query = `
        mutation {
            checkoutCreate(input: {
                lineItems: [
                    ${lineItems}
                ]
            }) {
              checkout {
                 id
                 webUrl
                 lineItems(first: 5) {
                   edges {
                     node {
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