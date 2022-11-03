import axios from "axios";
import {
  adminHeadersGraphql,
  adminURLGraphql,
} from "../../../../utils/api/header";
import redisClient from "../../../../lib/redis";

const requests = async (req, res) => {
  try {
    const params = req.query;
    const id = params.id;
    let cacheProduct = await redisClient.get(`product-${id}`);
    if (cacheProduct) {
      res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");
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
      await redisClient.set(
        `product-${id}`,
        JSON.stringify(data.data),
        "EX",
        86400
      );
      res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");
      res.json(data.data);
    }
  } catch (e) {
    res.json({ error: e });
  }
};

export default requests;
