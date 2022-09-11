import React, { useState } from 'react'
import Image from '../common/Image'
import { GoArrowLeft, GoArrowRight } from 'react-icons/go'
import Button from '@mui/material/Button'

export default function Gallery({images}) {
    const [index, setIndex] = useState(0)

    const handleImageClick = (target, i) => {
        setIndex(i)
    }
    const handleNextClick = (direction) => {
        // 0 -> 3
        if (direction) {
            if (index < images.length - 1) {
                setIndex(index => index += 1)
            }
            else if (index === images.length - 1) {
                setIndex(0)
            }
        }
        else {
            if (index > 0) {
                setIndex(index => index -= 1)
            }
            else if (index === 0) {
                setIndex(images.length - 1)
            }
        }
    }
    
    return (
        <div id="image-gallery" className='flex flex-col space-y-2'>
            <div className="relative w-full h-80 xl:h-96 image-gallery-main">
                <Image
                    layout="fill"
                    src={images[index].node.src}
                    alt={images[index].node.altText}
                />
                <div className='absolute arrow-next left-2 top-1/2'>
                    <Button className="text-black" onClick={() => handleNextClick(false)}>
                        <GoArrowLeft className='text-lg'/>
                    </Button>
                </div>
                <div className='absolute arrow-next right-2 top-1/2'>
                    <Button className="text-black" onClick={() => handleNextClick(true)}>
                        <GoArrowRight className='text-lg'/>
                    </Button>
                </div>
            </div>
            <div className={`grid grid-cols-${images.length} w-full gap-x-2`}>
                {
                    images.map((e, i)=> (
                        <div onClick={(target) => handleImageClick(target, i)} className='hover:opacity-70 ease-in-out relative cursor-pointer w-full h-32' key={i}>
                            <Image alt={e.node.altText} layout="fill" src={e.node.src}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
