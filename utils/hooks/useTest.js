import React, {useEffect, useState} from 'react'
import {useMutation, useQuery} from '@tanstack/react-query'
import {decryptText} from '../utils'
import {cartRetrieve} from '../api/requests'

let useTest = () => {
    let {data, isLoading, isError} = useQuery(
        ['all'],
        async () => {
            let id = decryptText(sessionStorage.getItem('cart'))
            if (!id) return
            let data = await cartRetrieve({id: id})
            return data.data.cart

        }
    )

    // Retrieve cart
    return {data, isLoading, isError}
}  

export default useTest