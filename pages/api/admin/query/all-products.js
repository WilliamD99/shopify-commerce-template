import axios from 'axios'
import {adminHeadersGraphql, adminURLGraphql} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {
        const query = `
        {
            products(first: 10) {
              edges {
                node {
                    id
                    title
                    handle
                    description
                    featuredImage{
                        url
                    }
                    vendor
                    totalInventory
                    status
                    tags
                    totalVariants
                    productType
                    variants(first: 5) {
                        edges {
                          node {
                            id
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