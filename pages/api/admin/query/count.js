// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {adminHeaders} from '../../../../utils/api/header'
import axios from 'axios'

const url = `${process.env.NEXT_PUBLIC_ADMIN_URL}products/count.json`

const request = async (req, res) => {
  try {
    const data = await axios.get(url, {
      headers: adminHeaders
    })  
    res.json(data.data)
  }
  catch(e) {
    res.json(e)
  }
}

export default request