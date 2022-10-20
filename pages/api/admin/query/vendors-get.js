import axios from "axios";
import {
  adminHeadersGraphql,
  adminURLGraphql,
} from "../../../../utils/api/header";
import redisClient from "../../../../lib/redis";

const requests = async (req, res) => {
  try {
    let redisVendor = await redisClient.get("vendors");

    if (redisVendor) {
      res.json(JSON.parse(redisVendor));
    } else {
      const query = `
      query productVendors {
          shop {
            productVendors(first: 200) {
              edges {
                node
              }
            }
          }
      }
      `;
      const data = await axios.post(adminURLGraphql, query, {
        headers: adminHeadersGraphql,
      });
      redisClient.set("vendors", JSON.stringify(data.data), "EX", 86400);
      // res.setHeader("Cache-Control", "s-maxage=86400");
      res.json(data.data);
    }
  } catch (e) {
    res.json({ error: e });
  }
};

export default requests;
