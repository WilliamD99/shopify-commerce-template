import axios from 'axios'
import {storefrontHeaders, storefrontURL} from '../../../../utils/api/header'

const request = async (req, res) => {
    try {
        const params = req.body.data
        let checkoutId = params.checkoutId

        const query = `
            mutation {
                checkoutDiscountCodeRemove(checkoutId: "${checkoutId}") {
                    checkoutUserErrors {
                        code
                        field
                        message
                    }
                }
            }
        `
        let data = await axios.post(storefrontURL, query, {
            headers: storefrontHeaders
        })
        res.json({data: data.data})
    }
    catch(e) {
        res.json(e)
    }
}
export default request



