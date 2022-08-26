import axios from "axios";
import {
  adminHeadersGraphql,
  adminURLGraphql,
} from "../../../../utils/api/header";

const requests = async (req, res) => {
  try {
    const params = req.body.data;
    const reversed = params.reversed;
    let reverseQuery;
    if (reversed) reverseQuery = "true";
    else reverseQuery = "";

    const sortKey = params.sortKey;
    let sortQuery;
    if (sortKey) sortQuery = `sortKey: ${sortKey}`;
    else sortQuery = "";

    const cursor = params.cursor;
    // True is forward, false is backward
    const direction = params.direction;
    let position;
    if (!cursor) position = "first: 12";
    else if (cursor && direction) position = `first: 12, after: "${cursor}"`;
    else if (cursor && !direction) position = `last: 12, before: "${cursor}"`;
    const query = `
    {
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
                collection {
                  handle
                }
                description
                featuredImage{
                    url
                }
                priceRangeV2 {
                  minVariantPrice {
                    amount
                  }
                  maxVariantPrice {
                    amount
                  }
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
    const data = await axios.post(adminURLGraphql, query, {
      headers: adminHeadersGraphql,
    });
    res.json(data.data);
  } catch (e) {
    res.json({ error: e });
  }
};

export default requests;
