import { customerDefaultAddressUpdate } from '../api/requests'
import { useMutation } from '@tanstack/react-query'

let useDefaultAddressUpdate = () => {
    let mutation = useMutation(async(params) => {
        let data = await customerDefaultAddressUpdate(params)
        return data.data
    })
    return mutation
}

export default useDefaultAddressUpdate