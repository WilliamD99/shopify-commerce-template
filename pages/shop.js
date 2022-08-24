import { useState, useEffect } from 'react';
// Components
import DataLoading from '../components/Loading/dataLoading';
import Error from '../components/Error';
import SingeProduct from '../components/Shop/single-product';
import Filter from '../components/Shop/filter'
import Sorting from '../components/Shop/sorting';
import Breadcrumbs from '../components/common/Breadcrumbs'
// Hooks
import useGetAllProduct from '../utils/hooks/useGetAllProduct';
import useGetTotal from '../utils/hooks/useGetTotal'

import { productAll } from '../utils/api/requests';
import { useMutation } from '@tanstack/react-query';

export default function Shop() {
    const [dataArr, setDataArr] = useState([])
    const [count, setCount] = useState(0)

    // Init page with products
    let products = useGetAllProduct({})
    let total = useGetTotal()
    useEffect(() => {
        if (products.data) {
            let edges = products.data.products.edges
            setDataArr(edges)
            setCount(edges.length)
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
        if (params.direction) setCount(edges.length + count)
        else setCount(count - edges.length)
        return data.data
    })

    return (
        <>
            <div>Shop</div>
            <Breadcrumbs path={[{name: "Home", path: "/"}, {name: "Shop", path: "/shop"}]}/>
            {/* <Filter /> */}
            {/* <Sorting mutateProductNext={mutateProductNext}/> */}

            {/* Show product count */}
            <div>
                <p>
                    Showing
                    <span className='mx-1'>
                        {
                            count === 12 ?
                            "1-12"
                            :
                            `${count - dataArr.length + 1}-${count}`
                        }
                    </span>
                    of
                    <span className='mx-1'>
                        {
                            total.data ?
                            total.data.count
                            :
                            <></>
                        }
                    </span>
                </p>
            </div>

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
                    !products.isLoading || !mutateProductNext.isLoading ?
                    dataArr.map((e, i) => (
                        <SingeProduct key={i} e={e}/>
                    ))
                    :
                    <p>Loading...</p>
                }
            </div>
        </>
    )
}
