import axios from 'axios'
import {adminHeadersGraphql, adminURLGraphql} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {
        let params = req.body.data
        let search = params.search

        const query = `
        {
            products(first:10, query:"title:${search}*") {
            edges {
              node {
                title
                handle
                id
                description
                priceRangeV2 {
                  minVariantPrice {
                    amount
                  }
                  maxVariantPrice {
                    amount
                  }
                }
                tags
                featuredImage {
                  url
                }
                options {
                  name
                  values
                }
                variants(first: 10) {
                  edges {
                    node {
                      id
                      compareAtPrice
                      price
                    }
                  }
                }
              }
            }
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