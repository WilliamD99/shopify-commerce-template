import { useState, useEffect } from 'react';
// Components
import DataLoading from '../components/Loading/dataLoading';
import Error from '../components/Error';
import SingeProduct from '../components/Shop/single-product';
import Link from '../components/common/Link'
// Hooks
import useGetAllProduct from '../utils/hooks/useGetAllProduct';

import { productAll } from '../utils/api/requests';
import { useMutation } from '@tanstack/react-query';
import {CREATED_AT, TITLE, UPDATED_AT, PRODUCT_TYPE} from '../utils/sort_key'
import useAllCollection from '../utils/hooks/useAllCollection'

export default function Shop() {
    const [dataArr, setDataArr] = useState([])
    const [sortKey, setSortKey] = useState()

    let handleSort = (e) => {
        setSortKey(e.target.value)
        mutateProductNext.mutate({direction: true, sortKey: e.target.value})
    }

    // Init page with products
    let products = useGetAllProduct({})
    useEffect(() => {
        if (products.data) {
            let edges = products.data.products.edges
            setDataArr(edges)
        }
    }, [products.data])

    // Handle next/previous page
    let mutateProductNext = useMutation(async(params) => {
        let data = await productAll(
            { 
                cursor: params.cursor, 
                direction: params.direction, 
                sortKey: params.sortKey, 
                reversed: params.reversed 
            }
        )
        let edges = data.data.products.edges
        setDataArr(edges)
        return data.data
    })

    let collections = useAllCollection()

    if (products.isLoading || mutateProductNext.isLoading) return <DataLoading />

    return (
        <>
            <div>Shop</div>

            <div className='grid grid-cols-4 gap-5'>
                {
                    collections.data !== undefined ?
                    collections.data.collections.edges.map((e, i) => (
                        <div key={i} className="bg-slate-200 flex justify-center items-center">
                            <Link href={`/shop/products-in-collection?col=${e.node.id}`}>{e.node.title}</Link>
                        </div>
                    ))
                    :
                    <></>
                }
            </div>

            <select value={sortKey} onChange={handleSort}>
                <option value={CREATED_AT}>Date Created Acensding</option>
                <option value={UPDATED_AT}>Date Updated</option>
                <option value={TITLE}>Title</option>
                <option value={PRODUCT_TYPE}>Product Type</option>
            </select>

            <div className='flex justify-center items-center space-x-5'>
                <button onClick={() => {
                    let cursor = dataArr[0].cursor
                    mutateProductNext.mutate({cursor: cursor, direction: false})
                }}>Previous</button>
                <button onClick={() => {
                    let cursor = dataArr[dataArr.length - 1].cursor
                    mutateProductNext.mutate({cursor: cursor, direction: true})
                }}>Next</button>
            </div>

            <div className='grid grid-cols-4 gap-2'>
                {
                    dataArr.map((e, i) => (
                        <SingeProduct key={i} e={e}/>
                    ))
                }
            </div>
        </>
    )
}
