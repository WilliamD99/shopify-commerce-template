import stripe from "../../../utils/api/stripe";

const request = async (req, res) => {
  try {
    const params = req.body.data;
    let amount = parseInt(params.amount);
    let currency = params.currency;
    let id = params.id;
    let customerId = params.customerId;
    let lineItems = params.lineItems;
    let shippingLine = params.shippingLine;
    let shippingAddress = params.shippingAddress;
    const data = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        id: id,
        customerId: customerId,
        lineItems: JSON.stringify(lineItems),
        shippingLine: JSON.stringify(shippingLine),
        shippingAddress: JSON.stringify(shippingAddress),
      },
    });
    res.json(data.client_secret);
  } catch (e) {
    res.json(e);
  }
};
export default request;
