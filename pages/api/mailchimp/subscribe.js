import mailchimp from "../../../lib/mailchimp";

const request = async (req, res) => {
  try {
    const params = req.body.data;
    const AUDIENCE_ID = process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE;

    const response = await mailchimp.lists.addListMember(AUDIENCE_ID, {
      email_address: params.email,
      status: "subscribed",
    });
    res.json(response);
  } catch (e) {
    res.json(e);
  }
};

export default request;
