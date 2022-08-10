import axios from 'axios'
import {storefrontHeaders, storefrontURL} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {
        const query = `
        {
            products(first: 10) {
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                }
                edges {
                    node {
                        id
                        title
                        handle
                        description
                        productType
                        priceRange {
                            maxVariantPrice {
                                amount
                            }
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
                    cursor
                }
            }
        }
        `
        const data = await axios.post(storefrontURL, query, {
            headers: storefrontHeaders
        })
        console.log(data)
        res.json(data.data)
    }
    catch(e) {
        res.json({error: e})
    }
}

export default requests