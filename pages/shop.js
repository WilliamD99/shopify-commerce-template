import { useState, useEffect } from 'react';
// Components
import DataLoading from '../components/Loading/dataLoading';
import Error from '../components/Error';
import SingeProduct from '../components/Shop/single-product';
import useGetAllProduct from '../utils/hooks/useGetAllProduct';

export default function Shop() {
    const [dataArr, setDataArr] = useState([])

    let products = useGetAllProduct()

    useEffect(() => {
        if (products.data) setDataArr(products.data)
    }, [products])

    if (products.isLoading) return <DataLoading />
    if (products.isError) return <p>{products.error}</p>

    return (
        <>
            <div onClick={() => console.log(dataArr)}>Shop</div>
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
