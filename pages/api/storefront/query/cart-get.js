import axios from 'axios'
import {storefrontHeaders, storefrontURL} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {
        const params = req.body.data
        const id = params.id

        const query = `
        query {
            cart(
              id: "${id}"
            ) {
              id
              createdAt
              updatedAt
              lines(first: 10) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                      }
                    }
                    attributes {
                      key
                      value
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
              buyerIdentity {
                email
                phone
                customer {
                  id
                }
                countryCode
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