import React, { useRef } from 'react'
import Image from '../../common/Image'

export default function Single({ e, hide, show, isShow }) {
    let singleRef = useRef()

    return (
        <>
            <div ref={singleRef} className='flex flex-col space-y-5 shadow-xl cursor-pointer' onClick={(e) => {
                if (!isShow) {
                    show(singleRef.current)
                } else {
                    hide()
                }
            }}>
                <div className='relative h-64 w-full'>
                    <Image src="/placeholder.webp" layout="fill" />
                </div>
            </div>
        </>
    )
}
