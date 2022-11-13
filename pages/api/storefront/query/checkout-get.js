import axios from "axios";
import { storefrontHeaders, storefrontURL } from "../../../../utils/api/header";

const requests = async (req, res) => {
  try {
    let params = req.body.data;
    let id = params.id;

    const query = `
        {
            node(id: "${id}") {
              ... on Checkout {
                id
                webUrl
                totalTaxV2 {
                  amount
                }
                totalPriceV2 {
                  amount
                }
                shippingLine {
                  handle
                  priceV2 {
                    amount
                  }
                }
                lineItemsSubtotalPrice {
                  amount
                }
                availableShippingRates{
                  shippingRates {
                    handle
                    title
                    priceV2 {
                      amount
                    }
                  }
                }
                shippingAddress {
                  address1
                }
                completedAt
                orderStatusUrl
                lineItems(first: 20) {
                  edges {
                    node {
                      id
                      title
                      quantity
                      discountAllocations {
                        allocatedAmount {
                          amount
                        }
                      }
                      variant {
                        id
                        price
                        title
                        image {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
        }
        `;
    const data = await axios.post(storefrontURL, query, {
      headers: storefrontHeaders,
    });
    console.log(data.data);
    res.json(data.data);
  } catch (e) {
    console.log(e);
    res.json({ error: e });
  }
};

export default requests;
