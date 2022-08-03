import axios from 'axios'
import {storefrontHeaders, storefrontURL} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {
        const params = req.body.data
        let handle = params.handle
        console.log(handle)

        const query = `
        {
            productByHandle(handle: "${handle}") {
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

        }
        `
        const data = await axios.post(storefrontURL, query, {
            headers: storefrontHeaders
        })
        console.log(data.data)
        res.json(data.data)
    }
    catch(e) {
        res.json({error: e})
    }
}

export default requests