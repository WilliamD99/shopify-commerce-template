import axios from "axios";
import {
  adminHeadersGraphql,
  adminURLGraphql,
} from "../../../../utils/api/header";

const requests = async (req, res) => {
  try {
    let params = req.body.data;
    let id = params.id;

    const query = `
            {
                customer(id: "${id}") {
                    id
                    firstName
                    lastName
                    email
                    phone
                    defaultAddress {
                        id
                        address1
                    }
                }
            }
        `;
    console.log(query);
    const data = await axios.post(adminURLGraphql, query, {
      headers: adminHeadersGraphql,
    });
    res.json(data.data);
  } catch (e) {
    res.json({ error: e });
  }
};

export default requests;
