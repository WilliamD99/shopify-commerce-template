import React, { useState } from 'react'
import { FiSearch } from "react-icons/fi";
import SearchDrawer from './SearchDrawer';


export default function Index() {
    const [open, setOpen] = useState(false)
    return (
        <>
            <FiSearch className='cursor-pointer hover:opacity-80' onClick={() => setOpen(!open)} />
            <SearchDrawer open={open} setOpen={setOpen} />
        </>
    )
}
