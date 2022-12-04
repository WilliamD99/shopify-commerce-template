import React, { useEffect, useState } from 'react'

export default function Progress() {
    const [scrollPos, setScrollPos] = useState(0)

    const listenToScrollEvent = () => {
        requestAnimationFrame(() => {
            // Calculates the scroll distance
            calculateScrollDistance();
        });
    };

    const calculateScrollDistance = () => {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const docHeight = getDocHeight();

        const totalDocScrollLength = docHeight - windowHeight;
        const scrollPostion = Math.floor(scrollTop / totalDocScrollLength * 100)
        setScrollPos(scrollPostion)
    }

    const getDocHeight = () => {
        return Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
    }

    useEffect(() => {
        document.addEventListener("scroll", listenToScrollEvent);
        // Remove event on unmount
        return () => {
            document.removeEventListener("scroll", listenToScrollEvent)
        }
    }, [])

    return (
        <>
            <div
                id="blog_progress"
                className='w-screen fixed bottom-0'
                style={{
                    background: `linear-gradient(to right, rgba(0, 0, 0, 0.8) ${scrollPos}%, transparent 0)`
                }}>
            </div>
        </>
    )
}
