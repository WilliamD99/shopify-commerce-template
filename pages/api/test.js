import axios from "axios";

import { adminURLGraphql, adminHeadersGraphql } from "../../utils/api/header";

const request = async (req, res) => {
  try {
    const query = `
    {
        products(first: 10) {
          edges {
            node {
                id
                title
                handle
                description
                featuredImage{
                    url
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
export default request;
