import axios from "axios";
import { storefrontHeaders, storefrontURL } from "../../../../utils/api/header";

const requests = async (req, res) => {
  try {
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
    res.json(data.data);
  } catch (e) {
    res.json({ error: e });
  }
};

export default requests;
