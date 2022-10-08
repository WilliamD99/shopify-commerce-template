import axios from "axios";
import {
  adminHeadersGraphql,
  adminURLGraphql,
} from "../../../../utils/api/header";

// import * as Redis from 'ioredis'
// const redis = new Redis({
//   host: "redis-17071.c277.us-east-1-3.ec2.cloud.redislabs.com:17071",
//   port: "6379",
//   username: "default",
//   password: "SSIhBU7u9CkfpHditQkt87suRDMDkcvA"
// })

const requests = async (req, res) => {
  try {
    // let cache = await redis.get("all-p-cache")
    // cache = JSON.parse(cache)
    // let result = {}

    // if (cache) {
    //   console.log('running')
    // }
    // else {
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
  
      // Is on sales?
      let sales = params.sales;
      if (sales) {
        sales = `is_price_reduced:${sales}`;
        queryArr.push(sales);
      }
  
      // Vendor
      let vendors = params.vendors;
      if (vendors) {
        vendors = vendors.split(",");
        let vendorQuery = vendors.map((e) => `vendor:'${e}'`).join(" OR ");
        queryArr.push(vendorQuery);
      }
  
      // Product Type
      let type = params.type;
      if (type) {
        type = type.split(",");
        let vendorQuery = type.map((e) => `product_type:'${e}'`).join(" OR ");
        queryArr.push(vendorQuery);
      }
      const querySearch = queryArr.join(" ");
  
      const query = `
      {
          products(${position}, ${sortQuery}, ${reverseQuery}, query:"${querySearch}") {
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
                  metafields(first: 10) {
                    edges {
                      node {
                        key
                        value
                      }
                    }
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
      // console.log('not')
      // redis.set("all-p-cache", JSON.stringify(data.data), "EX", 60)
      res.json(data.data);

    // }
  } catch (e) {
    console.log(e);
    res.json({ error: e });
  }
};

export default requests;
