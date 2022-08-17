import axios from 'axios'
import {adminHeadersGraphql, adminURLGraphql} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {
        let params = req.body.data
        let id = params.id
        let cursor = params.cursor
        let direction = params.direction
        let sortKey = params.sortKey
        let reversed = params.reversed

        let reverseQuery 
        if (reversed) reverseQuery = "true"
        else reverseQuery = ""
    
        let sortQuery 
        if (sortKey) sortQuery = `sortKey: ${sortKey}`
        else sortQuery = ""


        let position

        if (!cursor) position = "first: 12"
        else if (cursor && direction) position = `first: 12, after: "${cursor}"`
        else if (cursor && !direction) position = `last: 12, before: "${cursor}"`
    
        const query = `
        {
            collection(id:"${id}") {
              title
              description
              handle
              products(${position}, ${sortQuery}, ${reverseQuery}) {
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                }
                edges {
                  cursor
                  node {
                    id
                    title
                    handle
                    description
                    tags
                    priceRange {
                      maxVariantPrice {
                        amount
                      }
                      minVariantPrice {
                        amount
                      }
                    }
                    featuredImage {
                      url
                    }
                    images(first: 5) {
                      edges {
                        node {
                          src
                        }
                      }
                    }
                    variants(first: 5) {
                      edges {
                        node {
                          id
                          price
                        }
                      }
                    }
                  }
                }
              }
              productsCount
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