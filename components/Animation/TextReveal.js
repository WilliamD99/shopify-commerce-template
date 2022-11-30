import React, { useEffect, useRef } from 'react'
import { gsap } from '../../utils/utils'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Text Reveal inline
export default function TextReveal(props) {
    const { children, className, stagger } = props
    let container = useRef()
    let childRef = useRef([])

    useEffect(() => {
        gsap.set(childRef.current, { y: "100%" })
        ScrollTrigger.batch(container.current, {
            interval: 1,
            onEnter: () => {
                container.current.classList.remove("invisible")
                gsap.to(childRef.current, { autoAlpha: 1, y: 0, stagger: stagger ? stagger : 0.2 })
            }
        })
    }, [])


    return (
        <>
            <div ref={container} className={`text-reveal invisible text-2xl overflow-hidden ${className}`}>
                {
                    children.map((e, i) => (
                        <span className='overflow-hidden' key={i}>
                            <span ref={(e) => childRef.current[i] = e}>{e}</span>
                        </span>
                    ))
                }
            </div>
        </>
    )
}
