import React, { useState } from 'react'
import { debounce } from 'lodash'

import TextField from '@mui/material/TextField'

export default function Search({ open, setOpen }) {
    const [searchVal, setSearchVal] = useState("")

    const handleFieldChange = (e) => {
        setSearchVal(e.target.value)
    }

    return (
        <>
            {
                open ?
                    <div id="blog-search__desktop" className="absolute backdrop-blur-3xl w-11/12 bottom-5 px-5 h-16 rounded-full z-50 flex flex-row items-center">
                        <div className="py-3 w-full">
                            <TextField
                                size="small"
                                fullWidth
                                variant="standard"
                                className="text-white w-full"
                                placeholder="Search..."
                                focused={open}
                                onBlur={() => setOpen(false)}
                                onChange={(e) => handleFieldChange(e)}
                            />
                        </div>
                    </div>
                    :
                    <></>
            }
        </>
    )
}
