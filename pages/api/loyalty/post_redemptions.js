import axios from "axios";

const request = async (req, res) => {
  try {
    const params = req.body.data;
    let email = params.email,
      option_id = params.option_id;

    let url = `https://loyalty.yotpo.com/api/v2/redemptions`;
    let headers = {
      Accept: "application/json",
      "content-type": "application/json",
      "x-guid": process.env.NEXT_PUBLIC_YOTPO_GUID,
      "x-api-key": process.env.NEXT_PUBLIC_YOTPO_KEY,
    };

    let data = await axios.post(
      url,
      {
        customer_email: email,
        redemption_option_id: option_id,
      },
      { headers: headers }
    );
    res.json(data.data);
  } catch (e) {
    res.json(e);
  }
};

export default request;
