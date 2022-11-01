import axios from "axios";
import {
  adminHeadersGraphql,
  adminURLGraphql,
} from "../../../../utils/api/header";

const requests = async (req, res) => {
  try {
    const params = req.body.data;
    const id = params.id;
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
    res.json(data.data);
  } catch (e) {
    res.json({ error: e });
  }
};

export default requests;
