import axios from 'axios'
import {storefrontHeaders, storefrontURL} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {
        const query = `
            {
                customers(first: 10) {
                    edges {
                        node {
                            id
                        }
                    }
                }
            }
        `
        const data = await axios.post(storefrontURL, query, {
            headers: storefrontHeaders
        })
        res.json(data.data)
    }
    catch(e) {
        res.json({error: e})
    }
}

export default requests