import axios from "axios";
import {
  adminHeadersGraphql,
  adminURLGraphql,
} from "../../../../utils/api/header";

const requests = async (req, res) => {
  try {
    let params = req.body.data;
    let search = params.search;
    let cursor = params.cursor;
    let direction = params.direction;
    let sortKey = params.sortKey;
    let reversed = params.reversed;

    let reverseQuery;
    if (reversed) reverseQuery = "true";
    else reverseQuery = "";

    let sortQuery;
    if (sortKey) sortQuery = `sortKey: ${sortKey}`;
    else sortQuery = "";

    let position;

    if (!cursor) position = "first: 12";
    else if (cursor && direction) position = `first: 12, after: "${cursor}"`;
    else if (cursor && !direction) position = `last: 12, before: "${cursor}"`;

    const query = `
          {
            products(
              ${position}, 
              query:"title:${search}*"
            ) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                cursor
                node {
                  title
                  handle
                  id
                  vendor
                  collections(first:5) {
                    edges {
                      node {
                        title
                        id
                      }
                    }
                  }
                  priceRangeV2 {
                    minVariantPrice {
                      amount
                    }
                    maxVariantPrice {
                      amount
                    }
                  }
                  tags
                  featuredImage {
                    url
                  }
                  variants(first: 10) {
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
