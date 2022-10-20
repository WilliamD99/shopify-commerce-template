import axios from "axios";
import { storefrontHeaders, storefrontURL } from "../../../../utils/api/header";

const request = async (req, res) => {
  try {
    const params = req.body.data;
    let checkoutId = params.checkoutId;
    let discountCode = params.discountCode;

    const query = `
            mutation {
                checkoutDiscountCodeApplyV2(checkoutId: "${checkoutId}", discountCode: "${discountCode}") {
                    checkoutUserErrors {
                        code
                        field
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
