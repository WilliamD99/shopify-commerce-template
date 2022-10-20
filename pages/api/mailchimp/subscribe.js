import axios from "axios";

const request = async (req, res) => {
  try {
    const params = req.body.data;
    const AUDIENCE_ID = process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE;
    const API_KEY = process.env.NEXT_PUBLIC_MAILCHIMP_API;
    const DATACENTER = process.env.NEXT_PUBLIC_MAILCHIMP_SERVER;

    const data = {
      email_address: params.email,
      status: "subscribed",
    };

    const response = await axios.post(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      {
        data: JSON.stringify(data),
      },
      {
        headers: {
          Authorization: `apikey ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    //   const response = await fetch(
    //     `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,

    //     {
    //       body: JSON.stringify(data),
    //       headers: {
    //         Authorization: `apikey ${API_KEY}`,
    //         'Content-Type': 'application/json',
    //       },
    //       method: 'POST',
    //     }
    //   );
    console.log(response.data);
    res.json(response.data);
  } catch (e) {
    console.log(e);
    res.json(e);
  }
};

export default request;
