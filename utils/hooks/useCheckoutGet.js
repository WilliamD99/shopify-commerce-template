import { checkoutGet } from "../api/requests";
import { useMutation } from "@tanstack/react-query";

let useCheckoutGet = () => {
    let mutation = useMutation(async(params) => {
        let data = await checkoutGet(params)
        return data.data
    })
    return mutation
}

export default useCheckoutGet