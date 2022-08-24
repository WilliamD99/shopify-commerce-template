import React, { useEffect, useState, useMemo } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { GoSearch } from 'react-icons/go'
import useProductSearch from '../../utils/hooks/useProductSearch'
import Image from '../common/Image'
import Link from '../common/Link'
import { useRouter } from 'next/router'
import throttle from 'lodash.throttle'

export default function Search() {
    // const [input, setInput] = useState("")
    const [options, setOptions] = useState([])
    const searchProduct = useProductSearch()
    const router = useRouter()

    // useEffect(() => {
    //     if (input.length > 2) {
    //         searchProduct.mutate({search: input})
    //         if (searchProduct.data) setOptions(searchProduct.data.data.products.edges)
    //     }
    // }, [input])

    useEffect(() => {
        setOptions([])
    }, [router.asPath])

    const handleInputChange = (e) => {
        let input = e.target.value
        searchProduct.mutate({search: input})
        if (searchProduct.data) {
            setOptions(searchProduct.data.data.products.edges)
        } else {
            setOptions([])
        } 

        
        if (input.length === 0) setOptions([])
    }

    const throttleEventHandler = useMemo(
        () => throttle(handleInputChange, 300)
    , [])

    return (
        <>  
            {/* <p onClick={() => console.log(options)}>Test</p> */}
            <div className=''>
                <Autocomplete 
                    freeSolo
                    filterOptions={x => x}
                    id="search-bar"
                    disableClearable
                    options={options}
                    getOptionLabel={option => option.node.title}
                    renderOption={(props, option) => {
                        if (options) return (
                            <Link key={option.node.title} href={`/product/${option.node.handle}`} className='px-1 py-1 flex flex-row items-center space-x-5 hover:bg-slate-300'>
                                <div className='relative h-20 w-20'>
                                    <Image src={option.node.featuredImage.src} layout="fill" alt={option.node.title}/>
                                </div>
                                <p className='text-sm'>{option.node.title}</p>
                            </Link>
                        )
                        else (
                            <p>No products found</p>
                        )
                    }}
                    renderInput={(params) => (
                        <TextField 
                            {...params}
                            label={
                                <div className='flex flex-row space-x-2 items-center'>
                                    <GoSearch className='text-white'/>
                                    <p className='text-white'>Search</p>
                                </div>
                            }
                            InputProps={{
                                ...params.InputProps,
                                type: 'search'
                            }}
                            variant="filled"
                            className='w-72 text-white'
                            color='warning'
                            onChange={e => handleInputChange(e)}
                        />
                    )}
                />
            </div>
        </>
    )
}
