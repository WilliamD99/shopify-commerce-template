import {adminHeaders, adminURL} from '../../../../utils/api/header'
import axios from 'axios'

const requests = async (req, res) => {
    try {
        const params = req.body.data
        const checkoutId = Buffer.from(params.checkoutId).toString('base64')

        const data = await axios.post(adminURL + `checkouts/${checkoutId}/payments.json`, {
            headers: adminHeaders
        })

        res.json(data.data) 
    }
    catch(e) {
        res.json(e)
    }
}

export default requests