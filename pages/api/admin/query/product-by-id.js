import axios from "axios";
import redisClient from "../../../../lib/redis";
import {
  adminHeadersGraphql,
  adminURLGraphql,
} from "../../../../utils/api/header";

const requests = async (req, res) => {
  try {
    const params = req.body.data;
    const id = params.id;

    let cacheProduct = await redisClient.get(`product-${id}`);
    if (cacheProduct) {
      res.json(JSON.parse(cacheProduct));
    } else {
      const query = `
      {
          product(id:"${id}") {
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
              variants(first: 5) {
                  edges {
                      node {
                          id
                      }
                  }
              }
          }
      }
      `;
      const data = await axios.post(adminURLGraphql, query, {
        headers: adminHeadersGraphql,
      });
      redisClient.set(`product-${id}`, JSON.stringify(data.data), "EX", 86400);
      res.json(data.data);
    }
  } catch (e) {
    console.log(e);
    res.json({ error: e });
  }
};

export default requests;
