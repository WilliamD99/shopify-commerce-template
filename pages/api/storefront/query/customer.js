import axios from "axios";
import { storefrontHeaders, storefrontURL } from "../../../../utils/api/header";

const requests = async (req, res) => {
  try {
    const params = req.body.data;
    const accessToken = params.accessToken;
    const query = `
            {
                customer(customerAccessToken: "${accessToken}") {
                    id
                    email
                    firstName
                    lastName
                    phone
                    defaultAddress {
                        id
                        address1
                        city
                        country
                        province
                        zip
                    }
                    addresses(first: 10) {
                        edges {
                            node {
                                id
                                address1
                                city
                                country
                                province
                                zip
                            }
                        }
                    }
                    orders(first: 10) {
                        edges {
                            node {
                                id
                                orderNumber
                                totalPriceV2 {
                                    amount
                                }
                                processedAt
                            }
                        }
                    }
                }
            }
        `;
    console.log(query);
    const data = await axios.post(storefrontURL, query, {
      headers: storefrontHeaders,
    });
    res.json(data.data);
  } catch (e) {
    console.log(e);
    res.json({ error: e });
  }
};

export default requests;
