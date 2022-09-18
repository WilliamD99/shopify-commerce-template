import axios from "axios";
import {
  adminHeadersGraphql,
  adminURLGraphql,
} from "../../../../utils/api/header";

const requests = async (req, res) => {
  try {
    const params = req.body.data;
    const id = params.id;

    const query = `
    {
      order(id:"${id}") {
        createdAt
        confirmed
        name
        note
        fullyPaid
        customer {
          displayName
          email
          numberOfOrders
          phone
        }
        totalPriceSet {
          presentmentMoney {
            amount
          }
        }
        subtotalLineItemsQuantity
        totalTaxSet {
          presentmentMoney {
            amount
          }
        }
        taxLines {
          title
          rate
        }
        totalShippingPriceSet{
          presentmentMoney {
            amount
          }
        }
        subtotalPriceSet {
          presentmentMoney {
            amount
          }
        }
        shippingLine {
          title
        }
        shippingAddress {
          city
          province
          address1
          country
          firstName
          lastName
          zip
        }
        lineItems(first: 10) {
          edges {
            node {
              image {
                url
              }
              name
              vendor
              product {
                handle
              }
              quantity
              originalUnitPriceSet {
                presentmentMoney {
                  amount
                }
              }
              totalDiscountSet {
                presentmentMoney {
                  amount
                }
              }
            }
          }
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
