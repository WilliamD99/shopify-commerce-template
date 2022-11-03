import axios from "axios";

const request = async (req, res) => {
  try {
    let params = req.query;
    let id = params.id;
    let url = `https://api-cdn.yotpo.com/v1/widget/${process.env.NEXT_PUBLIC_YOTPO_APP_KEY}/products/${id}/reviews.json`;
    let data = await axios.get(url);
    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
    res.json(data.data);
  } catch (e) {
    console.log(e);
    res.json(e);
  }
};

export default request;
