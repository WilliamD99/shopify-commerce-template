import axios from "axios";

const request = async (req, res) => {
  try {
    const params = req.body.data;
    const email = params.email;

    const url = `https://loyalty.yotpo.com/api/v2/customers?customer_email=${encodeURIComponent(
      email
    )}&with_history=true`;
    const headers = {
      Accept: "application/json",
      "x-guid": process.env.NEXT_PUBLIC_YOTPO_GUID,
      "x-api-key": process.env.NEXT_PUBLIC_YOTPO_KEY,
    };

    const data = await axios.get(url, {
      headers: headers,
    });
    res.json(data.data);
  } catch (e) {
    res.json(e);
  }
};

export default request;
