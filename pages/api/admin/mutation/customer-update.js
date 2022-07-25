import axios from 'axios'
import {adminHeadersGraphql, adminURLGraphql} from '../../../../utils/api/header'

const requests = async (req, res) => {
    try {
        let params = req.body.data
        let id = params.id
        let editQuery = `${
            params.fields.map(e => {
              let field = `${e.key}: "${e.value}"`
              return field
            })
          }
        `
        // [{key: "firstName", value: "John"}, {key: "lastName", value: "Doe"}]
        // --> "firstName: 'John', lastName: 'Doe'"

        const query = `
            mutation {
                customerUpdate(input: {
                    id: "${id}",
                    ${editQuery}
                }) {
                    customer {
                        id
                        firstName
                        lastName
                        email
                        phone
                        defaultAddress {
                            address1
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