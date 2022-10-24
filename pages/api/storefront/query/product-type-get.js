import axios from "axios";
import { storefrontHeaders, storefrontURL } from "../../../../utils/api/header";
import redisClient from "../../../../lib/redis";

const requests = async (req, res) => {
  try {
    let redisTypes = await redisClient.get("types");

    if (redisTypes) {
      redisClient.quit();
      res.json(JSON.parse(redisTypes));
    } else {
      const query = `  
          {
              productTypes(first: 100) {
                edges {
                  node
                }
              }
            }
          `;
      const data = await axios.post(storefrontURL, query, {
        headers: storefrontHeaders,
      });
      redisClient.set("types", JSON.stringify(data.data), "EX", 86400);
      redisClient.quit();
      res.json(data.data);
    }
  } catch (e) {
    res.json({ error: e });
  }
};

export default requests;
