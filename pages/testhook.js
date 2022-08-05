import React, { useEffect } from 'react'
import useTest from '../utils/hooks/useTest'

export default function Index() {
    const {data, isLoading} = useTest()
    useEffect(() => {
        console.log(data)
        console.log(isLoading)
    }, [isLoading])

    if (isLoading) return <p>Loading...</p>

    return (
        <div onClick={() => console.log("test.data")}>Index</div>
    )
}
