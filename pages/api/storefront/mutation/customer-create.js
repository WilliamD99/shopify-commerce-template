import axios from "axios";
import {
  adminHeadersGraphql,
  adminURLGraphql,
  storefrontHeaders,
  storefrontURL,
} from "../../../../utils/api/header";

const requests = async (req, res) => {
  try {
    const params = req.body.data;
    const email = params.email;
    const password = params.password;
    const acceptsMarketing = params.accept;

    const query = `
        mutation {
            customerCreate(input: {
                email: "${email}",
                password: "${password}",
                ${
                  acceptsMarketing
                    ? `acceptsMarketing: ${acceptsMarketing}`
                    : ""
                }
            }) {
              customerUserErrors {
                message
                field
              }
              customer {
                email
                id
                
              }
            }
        }
        `;
    const data = await axios.post(storefrontURL, query, {
      headers: storefrontHeaders,
    });
    let id = data.data.data.customerCreate.customer.id;
    let metafieldQuery = `
    mutation {
      metafieldsSet(metafields: [
        {
          namespace: "custom",
          ownerId: "${id}",
          type: "list.product_reference",
          key: "wishlist",
          value: "[]"
        },
        {
          namespace: "custom",
          ownerId: "${id}",
          type: "boolean",
          key: "approved",
          value: "false"
        }
      ]) {
        metafields {
          key
          value
        }
        userErrors {
          field
          message
        }
      }
    }
    `;
    await axios.post(adminURLGraphql, metafieldQuery, {
      headers: adminHeadersGraphql,
    });

    res.json(data.data);
  } catch (e) {
    console.log(e);
    res.json({ error: e });
  }
};

export default requests;
