import React, { useState } from 'react'
import Link from '../common/Link'
import useAllCollection from '../../utils/hooks/useAllCollection'

export default function Filter() {
    let collections = useAllCollection()

    return (
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
    )
}
