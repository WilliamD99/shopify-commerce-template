import React, { useContext } from 'react'
import deviceContext from '../../../utils/deviceContext'
import BannerMobile from './mobile'
import BannerDesktop from './desktop'

export default function Banner({ priority, title, link }) {
    const { isMobile } = useContext(deviceContext)

    return (
        <>
            {
                isMobile ?
                    <BannerMobile priority={priority} title={title} link={link} />
                    :
                    <BannerDesktop priority={priority} title={title} link={link} />
            }
        </>
    )
}
