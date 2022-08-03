import axios from 'axios'
import {adminHeadersGraphql, adminURLGraphql} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {

        const query = `
        {
            deliveryProfiles(first: 10) {
                edges {
                    node {            
                        id
                        activeMethodDefinitionsCount
                        name
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