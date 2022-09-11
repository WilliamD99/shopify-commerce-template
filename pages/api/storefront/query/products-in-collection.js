import axios from 'axios'
import {storefrontHeaders, storefrontURL} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {
        let params = req.body.data
        let handle = params.handle
        let cursor = params.cursor
        let direction = params.direction
        let sortKey = params.sortKey
        let reverse = params.reverse
        let queryArr = []
        let price = params.price
        let sales = params.sales

        let reverseQuery 
        if (reverse) reverseQuery = "true"
        else reverseQuery = ""
    
        let sortQuery 
        if (sortKey) sortQuery = `sortKey: ${sortKey}`
        else sortQuery = ""

        let position

        if (!cursor) position = "first: 12"
        else if (cursor && direction) position = `first: 12, after: "${cursor}"`
        else if (cursor && !direction) position = `last: 12, before: "${cursor}"`

        if (price) {
          let arr = price.split(',')
          price = `price:>${arr[0]} price:<${arr[1]}`
          queryArr.push(price)
        }

        let querySearch = queryArr.join(' ')
 

        const query = `
        {
            collectionByHandle(handle: "${handle}") {
                collection {
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
                          tags
                          vendor
                          priceRangeV2 {
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
                          collections(first: 5) {
                            edges {
                              node {
                                title
                                id
                              }
                            }
                          }
                          variants(first: 5) {
                            edges {
                              node {
                                id
                                price
                                compareAtPrice
                              }
                            }
                          }
                        }
                      }
                    }
                    productsCount
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
        console.log(e)
        res.json({error: e})
    }
}

export default requests