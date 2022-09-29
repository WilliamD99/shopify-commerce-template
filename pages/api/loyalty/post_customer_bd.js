import axios from "axios";

const request = async (req, res) => {
  try {
    const params = req.body.data;
    let email = params.email,
      day = params.day,
      month = params.month,
      year = params.year;

    let url = "https://loyalty.yotpo.com/api/v2/customer_birthdays";
    let headers = {
      Accept: "application/json",
      "content-type": "application/json",
      "x-guid": process.env.NEXT_PUBLIC_YOTPO_GUID,
      "x-api-key": process.env.NEXT_PUBLIC_YOTPO_KEY,
    };
    let data = await axios.post(
      url,
      { customer_email: email, day: day, month: month, year: year },
      { headers: headers }
    );

    res.json(data.data);
  } catch (e) {
    res.json(e);
  }
};

export default request;
