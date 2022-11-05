import axios from "axios";
import { storefrontHeaders, storefrontURL } from "../../../../utils/api/header";

const requests = async (req, res) => {
    try {
        const params = req.query;
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
                    metafields(identifiers: [
                        { namespace: "custom", key: "wishlist" },
                        { namespace: "custom", key: "approved" }
                      ]) {
                        key
                        value
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
        const data = await axios.post(storefrontURL, query, {
            headers: storefrontHeaders,
        });
        res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");
        res.json(data.data);
    } catch (e) {
        console.log(e);
        res.json({ error: e });
    }
};

export default requests;
