import axios from "axios";
import {
  adminHeadersGraphql,
  adminURLGraphql,
} from "../../../../utils/api/header";

const requests = async (req, res) => {
  try {
    let params = req.body.data;
    let id = params.id;
    let cursor = params.cursor;
    let direction = params.direction;
    let sortKey = params.sortKey;
    let reverse = params.reverse;

    let reverseQuery;
    if (reverse) reverseQuery = `reverse:${reverse}`;
    else reverseQuery = "";

    let sortQuery;
    if (sortKey) sortQuery = `sortKey:${sortKey}`;
    else sortQuery = "";

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
    const querySearch = queryArr.join(" ");

    const query = `
        {
            collection(id:"${id}") {
              title
              description
              handle
              productsCount
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
                    tags
                    vendor
                    priceRangeV2 {
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
    console.log(query);
    const data = await axios.post(adminURLGraphql, query, {
      headers: adminHeadersGraphql,
    });
    console.log(data.data);
    res.json(data.data);
  } catch (e) {
    console.log(e);
    res.json({ error: e });
  }
};

export default requests;
