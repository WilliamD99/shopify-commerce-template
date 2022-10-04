import axios from "axios";

const request = async (req, res) => {
  try {
    const params = req.body.data;
    let app = process.env.NEXT_PUBLIC_YOTPO_APP_KEY;
    let id = params.id;
    let url = `https://api.yotpo.com/products/${app}/${id}/bottomline`;

    let data = await axios.get(url);

    res.json(data.data);
  } catch (e) {
    res.json(e);
  }
};

export default request;
