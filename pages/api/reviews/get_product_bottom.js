import axios from "axios";

const request = async (req, res) => {
  try {
    const params = req.query;
    let app = process.env.NEXT_PUBLIC_YOTPO_APP_KEY;
    let id = params.id;
    let url = `https://api.yotpo.com/products/${app}/${id}/bottomline`;

    let data = await axios.get(url);
    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
    res.json(data.data);
  } catch (e) {
    res.json(e);
  }
};

export default request;
