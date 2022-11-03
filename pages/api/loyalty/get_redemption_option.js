import axios from "axios";

const request = async (req, res) => {
  try {
    const params = req.query;
    let email = params.email;

    let url = `https://loyalty.yotpo.com/api/v2/redemption_options?customer_email=${encodeURIComponent(
      email
    )}`;
    let headers = {
      Accept: "application/json",
      "x-guid": process.env.NEXT_PUBLIC_YOTPO_GUID,
      "x-api-key": process.env.NEXT_PUBLIC_YOTPO_KEY,
    };

    let data = await axios.get(url, { headers: headers });
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");
    res.json(data.data);
  } catch (e) {
    res.json(e);
  }
};

export default request;
