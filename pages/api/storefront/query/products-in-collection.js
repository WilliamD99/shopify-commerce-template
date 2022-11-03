import axios from "axios";
import { storefrontHeaders, storefrontURL } from "../../../../utils/api/header";

const requests = async (req, res) => {
  try {
    let params = req.query;
    let handle = params.handle;
    let limit = params.limit ? params.limit : 12;
    let cursor = params.cursor;
    let direction = params.direction;
    let sortKey = params.sortKey;
    let reverse = params.reverse;

    let reverseQuery;
    if (reverse) reverseQuery = `reverse:${reverse}`;
    else reverseQuery = "";

    let sortQuery;
    if (sortKey) {
      if (sortKey === "CREATED_AT") sortKey = "CREATED";
      sortQuery = `sortKey:${sortKey}`;
    } else sortQuery = "";

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
      priceRange = `{ price: { min: ${arr[0]}, max: ${arr[1]} } }`;
      queryArr.push(priceRange);
    }

    let instock = params.instock;
    if (instock) {
      queryArr.push(`{available: ${instock}}`);
    }

    let vendors = params.vendors;
    if (vendors) {
      vendors = vendors.split(",");
      vendors.map((e) => queryArr.push(`{ productVendor: "${e}" }`));
    }

    // Product Type
    let type = params.type;
    if (type) {
      type = type.split(",");
      type.map((e) => queryArr.push(`{ productType: "${e}" }`));
    }

    const query = `
        {
          collection(handle:"${handle}") {
            title
            description
            handle
            products(${position}, ${sortQuery}, ${reverseQuery}, ${queryArr.length > 0 ? `filters: [${queryArr}]` : ""
      }) {
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
                  totalInventory
                  vendor
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
          }
        }
        `;
    const data = await axios.post(storefrontURL, query, {
      headers: storefrontHeaders,
    });
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    res.json(data.data);
  } catch (e) {
    res.json({ error: e });
  }
};

export default requests;
