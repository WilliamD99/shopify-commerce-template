import React, { useRef, useLayoutEffect, useState } from 'react'
import Image from '../../../common/Image'
import Link from '../../../common/Link'
import WishlistButton from '../../../ProductDetails/wishlistButton'
import { BsTrash } from "react-icons/bs";

import { cartAdd, cartRemoveItem, gsap } from '../../../../utils/utils'
import { formatter } from '../../../../utils/utils'

export default function Item({ e, user, setCart }) {
    const itemRef = useRef()
    const [active, setActive] = useState(true)
    const [ctx, setCtx] = useState(gsap.context(() => { }, itemRef))

    useLayoutEffect(() => {
        ctx.add("remove", () => {
            gsap.to(ctx.selector(`#product-${e.handle}`), {
                opacity: 0,
                x: -20,
                duration: 0.3,
                ease: "Sine.easeInOut",
                onComplete: () => {
                    setActive(false)
                    cartRemoveItem(e, setCart)
                }
            })
        })
        return () => ctx.revert()
    }, [])

    return (
        <div ref={itemRef}>
            {
                active ?
                    <div
                        id={`product-${e.handle}`}
                        className="flex flex-row space-x-3 border-t-2 last-of-type:border-b-2 py-5 justify-between"
                    >
                        <div className="relative h-20 w-20">
                            <Image src={e.image} layout="fill" priority />
                        </div>
                        <div className="w-44">
                            <Link href={`/product/${e.handle}`} className="font-semibold">
                                {e.title}
                            </Link>
                            {e.variantTitle === "" ? (
                                <></>
                            ) : (
                                <p className="text-sm text-gray-500 italic ml-2">{e.variantTitle}</p>
                            )}
                            <div className="flex flex-row items-center mt-2 space-x-5">
                                <p className="text-sm">Quantity:</p>
                                <button
                                    className="text-lg"
                                    onClick={() => {
                                        e.quantity = -1;
                                        cartAdd(e, setCart);
                                    }}
                                >
                                    -
                                </button>
                                <p>{e.quantity}</p>
                                <button
                                    className="text-lg"
                                    onClick={() => {
                                        e.quantity = 1;
                                        cartAdd(e, setCart);
                                    }}
                                >
                                    +
                                </button>
                            </div>
                            <div className="mt-3 flex flex-row items-center space-x-3">
                                {user?.id ? (
                                    <WishlistButton
                                        list={
                                            user.metafields[
                                                user.metafields.findIndex((e) => e.key === "wishlist")
                                            ].value
                                        }
                                        id={e.productId}
                                        userId={user.id}
                                    />
                                ) : (
                                    <></>
                                )}
                                <BsTrash
                                    className="cursor-pointer"
                                    onClick={() => active && ctx.remove()}
                                />
                            </div>
                        </div>
                        <p>{formatter.format(parseFloat(e.price) * e.quantity)}</p>
                    </div>
                    :
                    <></>
            }
        </div>
    )
}
