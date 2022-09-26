import axios from "axios";
import { storefrontHeaders, storefrontURL } from "../../../../utils/api/header";

const requests = async (req, res) => {
  try {
    const params = req.body.data;

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
    let queryArr = [];

    let priceRange = params.price; // ?price=11,20
    if (priceRange) {
      let arr = priceRange.split(",");
      priceRange = `price:>${arr[0]} price:<${arr[1]}`;
      queryArr.push(priceRange);
    }

    let sales = params.sales;
    if (sales) {
      sales = `is_price_reduced:${sales}`;
      queryArr.push(sales);
    }

    let vendors = params.vendors;
    if (vendors) {
      vendors = vendors.split(",");
      let vendorQuery = vendors.map((e) => `vendor:'${e}'`).join(" OR ");
      queryArr.push(vendorQuery);
    }

    let type = params.vendors;
    if (type) {
      type = type.split(",");
      let vendorQuery = type.map((e) => `type:'${e}'`).join(" OR ");
      queryArr.push(vendorQuery);
    }

    const querySearch = queryArr.join(" ");

    const query = `
        {
            products(${position}, ${sortQuery}, ${reverseQuery}, query: "${querySearch}") {
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
        `;
    const data = await axios.post(storefrontURL, query, {
      headers: storefrontHeaders,
    });
    res.json(data.data);
  } catch (e) {
    res.json({ error: e });
  }
};

export default requests;
