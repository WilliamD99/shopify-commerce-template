import axios from 'axios'
import {storefrontHeaders, storefrontURL} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {
        const params = req.body.data

        // Reversed underlying list
        const reversed = params.reversed;
        let reverseQuery;
        if (reversed) reverseQuery = `reverse:${reversed}`;
        else reverseQuery = "";

        // Sort key
        const sortKey = params.sortKey;
        let sortQuery;
        if (sortKey) sortQuery = `sortKey: ${sortKey}`;
        else sortQuery = "";

        // Use for pagination
        const cursor = params.cursor;
        // True is forward, false is backward
        const direction = params.direction;
        let position;
        if (!cursor) position = "first: 12";
        else if (cursor && direction) position = `first: 12, after: "${cursor}"`;
        else if (cursor && !direction) position = `last: 12, before: "${cursor}"`;

        // Query the list
        const searchQuery = params.query
        let searchSyntax = ``
        if (searchQuery) searchSyntax = `query:${searchQuery}`

        const query = `
        {
            products(${position}, ${sortQuery}, ${reverseQuery}, ${searchSyntax}) {
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
                        vendor
                        collections(first: 5) {
                          edges {
                            node {
                              title
                              id
                            }
                          }
                        }
                        description
                        featuredImage{
                            url
                        }
                        priceRange {
                          minVariantPrice {
                            amount
                          }
                          maxVariantPrice {
                            amount
                          }
                        }
                        vendor
                        totalInventory
                        tags
                        productType
                        variants(first: 5) {
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
        const data = await axios.post(storefrontURL, query, {
            headers: storefrontHeaders
        })
        console.log(query)
        console.log(data.data)
        res.json(data.data)
    }
    catch(e) {
        res.json({error: e})
    }
}

export default requests