import axios from "axios";

const request = async (req, res) => {
  try {
    let params = req.body.data;
    let id = params.id;
    let url = `https://api-cdn.yotpo.com/v1/widget/${process.env.NEXT_PUBLIC_YOTPO_APP_KEY}/products/${id}/reviews.json`;
    let data = await axios.get(url);
    res.json(data.data);
  } catch (e) {
    console.log(e);
    res.json(e);
  }
};

export default request;
