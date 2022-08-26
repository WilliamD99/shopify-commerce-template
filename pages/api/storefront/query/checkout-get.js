import axios from 'axios'
import {storefrontHeaders, storefrontURL} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {
        let params = req.body.data
        let id = params.id

        const query = `
        {
            node(id: "${id}") {
              ... on Checkout {
                id
                totalTaxV2 {
                  amount
                }
                totalPriceV2 {
                  amount
                }
                shippingLine {
                  handle
                  priceV2 {
                    amount
                  }
                }
                lineItemsSubtotalPrice {
                  amount
                }
                availableShippingRates{
                  shippingRates {
                    handle
                    title
                    priceV2 {
                      amount
                    }
                  }
                }
                lineItems(first: 20) {
                  edges {
                    node {
                      id
                      quantity
                      variant {
                        id
                        price
                      }
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