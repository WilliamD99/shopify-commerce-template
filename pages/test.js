import React, { useState, useEffect } from 'react'
import { Transition } from 'react-transition-group'
import { gsap } from '../utils/utils'
import TextField from '@mui/material/TextField'

export default function Test() {
    const [open, setOpen] = useState(false)


    return (
        <>
            <p onClick={() => setOpen(!open)}>Test</p>
            <Transition
                timeout={1000}
                mountOnEnter
                unmountOnExit
                in={open}
                addEndListener={(node, done) => {
                    let tl = gsap.timeline({ onComplete: done })
                    tl.fromTo("#test", { width: open ? 0 : "10rem", alpha: open ? 0 : 1 }, { width: open ? "10rem" : 0, alpha: open ? 1 : 0, ease: "Sine.easeInOut" })
                    tl.fromTo("#test2", { alpha: open ? 0 : 1 }, { alpha: open ? 1 : 0, ease: "Sine.easeInOut" })
                }}
                onEnter={() => {
                    console.log('test')
                }}
            >
                <>
                    <TextField type={`text`} placeholder="test" id="test" />
                    <p id="test2">Cancel</p>
                </>
            </Transition>
        </>
    )
}
