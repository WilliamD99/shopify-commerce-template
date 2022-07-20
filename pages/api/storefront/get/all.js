import axios from 'axios'
import {storefrontHeaders} from '../../../../utils/header'

const url = process.env.NEXT_PUBLIC_STOREFRONT_URL

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
                                }
                            }
                        }
                    }
                    cursor
                }
            }
        }
        `
        const data = await axios.post(url, query, {
            headers: storefrontHeaders
        })
        res.json(data.data)
    }
    catch(e) {
        res.json({error: e})
    }
}

export default requests