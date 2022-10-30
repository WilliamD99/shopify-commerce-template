import axios from "axios";
import {
  adminHeadersGraphql,
  adminURLGraphql,
} from "../../../../utils/api/header";

const requests = async (req, res) => {
  try {
    let params = req.body.data;
    const query = `
    {
      products(
        first: ${params.number}, 
        query:"title:${params.search}*"
      ) {
        edges {
          node {
            title
            handle
            id
            vendor
            priceRangeV2 {
              minVariantPrice {
                amount
              }
              maxVariantPrice {
                amount
              }
            }
            featuredImage {
              url
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
