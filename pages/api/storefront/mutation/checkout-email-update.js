import axios from "axios";
import { storefrontHeaders, storefrontURL } from "../../../../utils/api/header";

const request = async (req, res) => {
  try {
    const params = req.body.data;
    let checkoutId = params.checkoutId;
    let email = params.email;

    const query = `
        mutation {
            checkoutEmailUpdateV2(
                checkoutId: "${checkoutId}", 
                email: "${email}"
            ) 
                {
              checkout {
                id
              }
              checkoutUserErrors {
                message
              }
            }
        }
        `;
    let data = await axios.post(storefrontURL, query, {
      headers: storefrontHeaders,
    });
    res.json({ data: data.data });
  } catch (e) {
    console.log(e);

    res.json(e);
  }
};
export default request;
