import axios from "axios";
import { decryptText, parseArraygGraphql } from "../../../utils/utils";
import { adminURLGraphql, adminHeadersGraphql } from "../../../utils/api/header";

const request = async (req, res) => {
    try {
        const webhookResponse = req.body
        const params = webhookResponse.data.object
        const customerId = params.metadata.customerId
        let lineItems = JSON.parse(params.metadata.lineItems)
        lineItems = parseArraygGraphql(lineItems)




        switch (webhookResponse.type) {
            case "payment_intent.created":
                break;
            case "payment_intent.succeeded":
                let query = `
                    mutation {
                        draftOrderCreate(input: {
                            billingAddress: {
                                address1: "test",
                                address2: "",
                                city: "Vancouver",
                                company: "test",
                                country: "Canada",
                                countryCode: CA,
                                firstName: "Test",
                                lastName: "test",
                                phone: "4564131",
                                province: "British Columbia",
                                provinceCode: "BC",
                                zip: "V5N2X2"
                              },
                            shippingAddress: {
                                address1: "123 Main St",
                                city: "Waterloo",
                                province: "Ontario",
                                country: "Canada",
                                zip: "A1A 1A1"
                            },
                            shippingLine: {
                                title: "Standard",
                                price: "14.9"
                            },
                            lineItems: ${lineItems},
                            customerId: "${customerId}"
                        }) {
                            draftOrder {
                                id
                            }
                            userErrors {
                                message
                            }
                        }
                    }
                `
                console.log(query)
                const data = await axios.post(adminURLGraphql, query, {
                    headers: adminHeadersGraphql,
                });
                console.log(data.data)
                let draftOrderId = data.data.data?.draftOrderCreate?.draftOrder?.id
                if (draftOrderId) {
                    query = `
                        mutation {
                            draftOrderComplete(id: "${draftOrderId}") {
                                userErrors {
                                    message
                                }
                            }
                        }
                    `
                    let draftOrderComplete = await axios.post(adminURLGraphql, query, {
                        headers: adminHeadersGraphql,
                    });
                    console.log(draftOrderComplete.data)

                }
                break;
        }

        res.json({ test: "avc" })
    }
    catch (e) {
        res.json(e)
    }
}
export default request