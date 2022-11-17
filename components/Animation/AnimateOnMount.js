import React, { useState, useEffect } from 'react'
import { gsap } from '../../utils/utils'
import { Transition } from 'react-transition-group'

// Should only be used for element in the viewport first load
export default function AnimateOnMount({ children, selector }) {
    const [show, setShow] = useState(false)
    useEffect(() => {
        setShow(true)
    }, [])

    return (
        <>
            <Transition
                timeout={1000}
                mountOnEnter
                unmountOnExit
                in={show}
                addEndListener={(node, done) => {
                    gsap.fromTo(
                        selector,
                        {
                            y: show ? 100 : 0,
                            autoAlpha: show ? 0 : 1,
                        },
                        {
                            y: show ? 0 : 100,
                            autoAlpha: show ? 1 : 0,
                            onComplete: done,
                            stagger: 0.1
                        }
                    );
                }}
            >
                {children}
            </Transition>
        </>
    )
}
