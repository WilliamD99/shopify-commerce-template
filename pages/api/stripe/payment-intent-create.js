import stripe from "../../../utils/api/stripe";

const request = async (req, res) => {
  try {
    const params = req.body.data;
    let amount = params.amount;
    let currency = params.currency;
    let id = params.id
    let customerId = params.customerId
    let lineItems = params.lineItems

    const data = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      // payment_method_types: payment_method,
      automatic_payment_methods: { enabled: true },
      metadata: {
        id: id,
        customerId: customerId,
        lineItems: JSON.stringify(lineItems)
      }
    });
    console.log(data)
    res.json(data.client_secret);
  } catch (e) {
    res.json(e);
  }
};
export default request;
