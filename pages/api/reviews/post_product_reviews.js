import axios from "axios";

const request = async (req, res) => {
  try {
    const params = req.body.data;
    const url = "https://api.yotpo.com/reviews/dynamic_create";
    const id = params.id;
    const productTitle = params.productTitle;
    const name = params.name ? params.name : "Anonymous";
    const email = params.email ? params.email : "dnam310199@gmail.com";
    const content = params.content;
    const title = params.title;
    const score = params.score;

    const requestData = {
      appkey: process.env.NEXT_PUBLIC_YOTPO_APP_KEY,
      domain: process.env.NEXT_PUBLIC_DOMAIN_URL,
      sku: id,
      product_title: productTitle,
      product_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}admin/products/${id}`,
      display_name: name,
      email: email,
      is_incentivized: false,
      review_content: content,
      review_title: title,
      review_score: score,
    };
    console.log(requestData);
    const data = await axios.post(
      url,
      {
        data: requestData,
      },
      {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
      }
    );
    res.json(data.data);
  } catch (e) {
    console.log(e);
    res.json(e);
  }
};

export default request;
