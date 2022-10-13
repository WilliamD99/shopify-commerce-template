import axios from "axios";
import { storefrontHeaders, storefrontURL } from "../../../../utils/api/header";

const requests = async (req, res) => {
  try {
    const params = req.body.data;

    // Limit
    const limit = params.limit ? params.limit : 12;

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
    if (!cursor) position = `first: ${limit}`;
    else if (cursor && direction)
      position = `first: ${limit}, after: "${cursor}"`;
    else if (cursor && !direction)
      position = `last: ${limit}, before: "${cursor}"`;

    // Query the list
    let queryArr = [];

    let priceRange = params.price; // ?price=11,20
    if (priceRange) {
      let arr = priceRange.split(",");
      priceRange = `variants.price:>=${arr[0]} variants.price:<=${arr[1]}`;
      queryArr.push(priceRange);
    }

    let instock = params.instock;
    if (instock) {
      instock = `available_for_sale:${instock}`;
      queryArr.push(instock);
    }

    let vendors = params.vendors;
    if (vendors) {
      vendors = vendors.split(",");
      let vendorQuery = vendors.map((e) => `vendor:'${e}'`).join(" OR ");
      queryArr.push(vendorQuery);
    }

    let type = params.type;
    if (type) {
      type = type.split(",");
      let vendorQuery = type.map((e) => `product_type:'${e}'`).join(" OR ");
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
                        metafields(identifiers: [
                          { namespace:"custom", key:"selection_type"},
                          { namespace:"custom", key:"related_products" }
                        ]) {
                          value
                        }
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
    console.log(query);
    const data = await axios.post(storefrontURL, query, {
      headers: storefrontHeaders,
    });
    res.json(data.data);
  } catch (e) {
    res.json({ error: e });
  }
};

export default requests;
