import React from 'react'
import Button from '@mui/material/Button'
import Image from '../Image'
import Slider from 'react-slick'

import { useRouter } from 'next/router'

export default function BannerMobile({
    priority, title, link
}) {
    const router = useRouter()

    return (
        <>

            <div id="banner-wrapper" className='w-screen h-112 mt-5'>
                <div className='mx-10 h-full relative'>
                    {
                        priority ?
                            <Image src="/placeholder.webp" layout="fill" priority={true} />
                            :
                            <Image src="/placeholder.webp" layout="fill" placeholder="blur" blurDataURL="/placeholder.webp" />
                    }
                    <div className='absolute bottom-5 left-5'>
                        <Button variant='outlined' className='normal-case rounded-full text-black border-black bg-white' onClick={() => router.push(`${link ? link : "#"}`)}>Test</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
