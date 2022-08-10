import axios from 'axios'
import {storefrontHeaders, storefrontURL} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {
        const params = req.body.data
        const lines = params.lines

        let linesQuery
        if (lines.length > 0) {
          linesQuery = lines.map(e => `{ merchandiseId: "${e.merchandiseId}", quantity: ${e.quantity}}`)
        } else {
          linesQuery = ``
        }

        const query = `
        mutation {
            cartCreate(
              input: {
                attributes: { key: "cart_attribute", value: "This is a cart attribute" },
                lines: [${linesQuery}]
              }
            ) {
              cart {
                id
                createdAt
                updatedAt
                lines(first: 10) {
                  edges {
                    node {
                      id

                      merchandise {
                        ... on ProductVariant {
                          id
                        }
                      }
                    }
                  }
                }
                attributes {
                  key
                  value
                }
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                  totalTaxAmount {
                    amount
                    currencyCode
                  }
                  totalDutyAmount {
                    amount
                    currencyCode
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