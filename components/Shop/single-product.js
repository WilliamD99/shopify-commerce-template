import React, { useContext } from 'react'
import { decryptObject, cartAdd, cartRemoveItem } from '../../utils/utils'
import Image from 'next/image'
import cartContext from '../../utils/cartContext'

export default function SingeProduct({e}) {
    const {setCart} = useContext(cartContext)
    return (
        <div className='flex flex-col mb-5 bg-slate-50 px-2 py-2 product'>
            <div className='relative w-10 h-10'>
                {/* <Image alt={e.node.title} src={e.node.featureImage.url} layout="fill"/> */}
            </div>
            <a href={`/product/${e.node.handle}`}>{e.node.title}</a>
            <div>
            {
                // e.node.varians
                e.node.variants.edges.map((item, index) => (
                <div key={index}>
                    <p>
                    {item.node.title}
                    {/* {item.node.id */}
                    </p>
                    <button className='border-2 border-black px-2' onClick={() => cartAdd({merchandiseId: item.node.id, quantity: 1, price: item.node.price}, setCart)}
                    >
                        Click me
                    </button>
                    <button className='border-2 border-black px-2 ml-2' onClick={() => cartAdd({merchandiseId: e.node.variants.edges[0].node.id, quantity: -1}, setCart)}
                    >
                        Remove 1
                    </button>
                    <button className='border-2 border-black px-2 ml-2' onClick={() => cartRemoveItem({merchandiseId: e.node.variants.edges[0].node.id}, setCart)}>
                        Remove
                    </button>
                </div>
                ))
            }
            </div>
        </div>
    )
}
