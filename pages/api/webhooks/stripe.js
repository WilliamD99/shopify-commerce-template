import axios from "axios";
import { parseArraygGraphql } from "../../../utils/utils";
import {
  adminURLGraphql,
  adminHeadersGraphql,
} from "../../../utils/api/header";
import stripe from "../../../utils/api/stripe";
import { buffer } from "micro";

export const config = {
  api: {
    bodyParser: false,
  },
};

const request = async (req, res) => {
  try {
    // Verify request coming from stripe
    let sig = req.headers["stripe-signature"];
    const buf = await buffer(req);
    let event;
    const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_PI;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
    }

    const webhookResponse = req.body;
    const params = webhookResponse.data.object;
    // Customer ID
    const customerId = params.metadata.customerId;
    // Items in cart
    let lineItems = JSON.parse(params.metadata.lineItems);
    lineItems = parseArraygGraphql(lineItems, true);
    // Shipping option
    let shippingLine = JSON.parse(params.metadata.shippingLine);
    shippingLine = parseArraygGraphql([shippingLine]);
    // Shipping Address
    let shippingAddress = JSON.parse(params.metadata.shippingAddress);
    shippingAddress = parseArraygGraphql([shippingAddress]);

    switch (webhookResponse.type) {
      case "payment_intent.created":
        res.json({ message: "pi created!" });
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
                            shippingAddress: ${shippingAddress},
                            shippingLine: ${shippingLine},
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
                `;
        console.log(query);
        // Create a draft order
        const data = await axios.post(adminURLGraphql, query, {
          headers: adminHeadersGraphql,
        });
        console.log("test");
        console.log(data.data);
        let draftOrderId = data.data.data?.draftOrderCreate?.draftOrder?.id;
        if (draftOrderId) {
          query = `
                        mutation {
                            draftOrderComplete(id: "${draftOrderId}") {
                                userErrors {
                                    message
                                }
                            }
                        }
                    `;
          // Complete the order after created
          let draftOrderComplete = await axios.post(adminURLGraphql, query, {
            headers: adminHeadersGraphql,
          });
          console.log("test2");
          console.log(draftOrderComplete.data);
          res.json({ message: "succeeded create an order" });
        }
        break;
    }
  } catch (e) {
    res.json(e);
  }
};
export default request;
