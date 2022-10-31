import React, { useContext } from 'react'
import deviceContext from '../../../utils/deviceContext'
import dynamic from 'next/dynamic'

const SliderDesktop = dynamic(() => import('./desktop'))
const SliderMobile = dynamic(() => import('./mobile'))

export default function SliderIndex({ data }) {
    const { isMobile } = useContext(deviceContext)

    return (
        <>
            {
                isMobile ?
                    <SliderMobile data={data} />
                    :
                    <SliderDesktop data={data} />
            }
        </>
    )
}
