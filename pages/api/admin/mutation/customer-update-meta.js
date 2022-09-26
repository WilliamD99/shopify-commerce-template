import axios from "axios";
import {
  adminHeadersGraphql,
  adminURLGraphql,
} from "../../../../utils/api/header";

const requests = async (req, res) => {
  try {
    let params = req.body.data;
    let id = params.id;
    let list = params.list; // data e.g: ["", ""] --> array
    let stringList = `"[${list.map((e) => "\\" + `"${e}` + '\\"')}]"`;

    const query = `
    mutation {
        metafieldsSet(metafields: [
          {
            namespace: "custom", 
            ownerId: "${id}", 
            type: "list.product_reference", 
            key: "wishlist", 
            value: ${stringList}
        },
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
    const data = await axios.post(adminURLGraphql, query, {
      headers: adminHeadersGraphql,
    });
    res.json(data.data);
  } catch (e) {
    res.json({ error: e });
  }
};

export default requests;
