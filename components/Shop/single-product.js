import React from 'react'
import { decryptObject } from '../../utils/utils'
import Image from 'next/image'

export default function SingeProduct({e, add, update, remove}) {
    return (
        <div className='flex flex-col mb-5 bg-slate-50 px-2 py-2 product'>
            <div className='relative w-10 h-10'>
                {/* <Image alt={e.node.title} src={e.node.featureImage.url} layout="fill"/> */}
            </div>
            <p>{e.node.title}</p>
            <div>
            {
                // e.node.varians
                e.node.variants.edges.map((item, index) => (
                <div key={index}>
                    <p>
                    {item.node.title}
                    {/* {item.node.id */}
                    </p>
                    <button className='border-2 border-black px-2' onClick={() => {
                    let cart = decryptObject(sessionStorage.getItem('cart-items'))
                    let lines = cart.lines.edges

                    // Findout if the product is in the cart or not
                    // --> decide whether to add or update
                    let product, isInCart, quantityCurrent
                    for (let i = 0; i < lines.length; i++) {
                        if (lines[i].node.merchandise.id === item.node.id) {
                            product = lines[i].node.id
                            isInCart = true
                            quantityCurrent = lines[i].node.quantity + 1
                        }
                        else {
                            isInCart = false
                        }
                    }
                    !isInCart ? 
                        add({merchandiseId: item.node.id, quantity: 1})
                        :
                        update({merchandiseId: product, quantity: quantityCurrent})
                    
                    }}>
                        Click me
                    </button>
                    <button className='border-2 border-black px-2 ml-2' onClick={() => {
                    let cart = decryptObject(sessionStorage.getItem('cart-items'))
                    let lines = cart.lines.edges

                    let product, isInCart, quantityCurrent
                    for (let i = 0; i < lines.length; i++) {
                        if (lines[i].node.merchandise.id === item.node.id) {
                            product = lines[i].node.id
                            isInCart = true
                            quantityCurrent = lines[i].node.quantity - 1
                        }
                        else {
                        isInCart = false
                        }
                    }
                    
                    if (isInCart) update({merchandiseId: product, quantity: quantityCurrent})
                    }}>
                        Remove 1
                    </button>
                    <button className='border-2 border-black px-2 ml-2' onClick={() => {
                    let cart = decryptObject(sessionStorage.getItem('cart-items'))
                    let lines = cart.lines.edges

                    // Findout if the product is in the cart or not
                    // --> decide whether to add or update
                    let product, isInCart
                    for (let i = 0; i < lines.length; i++) {
                        if (lines[i].node.merchandise.id === item.node.id) {
                            product = lines[i].node.id
                            isInCart = true
                        }
                        else {
                            isInCart = false
                        }
                    }
                    if (isInCart) remove({merchandiseId: product})
                    }}>
                        Remove
                    </button>
                </div>
                ))
            }
            </div>
        </div>
    )
}
