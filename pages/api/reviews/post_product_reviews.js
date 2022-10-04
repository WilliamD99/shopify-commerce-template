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

    var data = JSON.stringify({
      appkey: process.env.NEXT_PUBLIC_YOTPO_APP_KEY,
      domain: process.env.NEXT_PUBLIC_DOMAIN_URL,
      product_title: productTitle,
      sku: id,
      product_description: "This is a test test",
      product_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}admin/products/${id}`,
      display_name: name,
      email: email,
      is_incentivized: false,
      review_content: content,
      review_title: title,
      review_score: score,
    });

    var config = {
      method: "post",
      url: "https://api.yotpo.com/reviews/dynamic_create",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: data,
    };

    let returnedData = await axios(config);

    res.json(returnedData.data);
  } catch (e) {
    console.log(e);
    res.json(e);
  }
};

export default request;
