import axios from 'axios'
import {adminHeadersGraphql, adminURLGraphql} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {
        const query = `
        {
            collections(first: 100) {
              edges {
                node {
                  id
                  title
                  handle
                  productsCount
                  description
                }
              }
            }
          }
        `
        const data = await axios.post(adminURLGraphql, query, {
            headers: adminHeadersGraphql
        })
        res.json(data.data)
    }
    catch(e) {
        res.json({error: e})
    }
}

export default requests