import React, { useEffect, useState, useRef, useCallback } from 'react'
import { formatter } from '../../../utils/utils';
import { debounce } from 'lodash';
import { productSearchTemp } from '../../../lib/serverRequest';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Skeleton from '@mui/material/Skeleton'
import Image from '../Image'
import Link from '../Link'

export default function SearchDrawer({ open, setOpen }) {
    let [searchQuery, setSearchQuery] = useState();
    const router = useRouter()

    const { data, isFetching } = useQuery(
        [`search-${searchQuery}`],
        () => productSearchTemp({ search: searchQuery, number: 7 }),
        { enabled: Boolean(searchQuery) }
    );

    // For text input change
    let search = useCallback((criteria) => {
        if (criteria === "") {
            setSearchQuery(null);
        } else {
            setSearchQuery(criteria);
        }
    }, []);
    const debouncedSearch = useRef(
        debounce((criteria) => {
            search(criteria);
        }, 500)
    ).current;
    let handleChange = useCallback(async (e) => {
        debouncedSearch(e.target.value);
    }, []);
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const handleDisplay = () => {
        if (!data && isFetching) return (
            <div className='grid grid-cols-1 gap-y-4 max-h-1/12'>
                <div className='grid grid-cols-2 gap-x-5'>
                    <div>
                        <Skeleton variant='rectangular' className='w-36 h-36 ' />
                    </div>
                    <div className='w-full'>
                        <Skeleton className='w-full' />
                        <Skeleton className="w-1/2" />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-x-5'>
                    <div>
                        <Skeleton variant='rectangular' className='w-36 h-36 ' />
                    </div>
                    <div className='w-full'>
                        <Skeleton className='w-full' />
                        <Skeleton className="w-1/2" />
                    </div>
                </div>
            </div>
        )
        else if (data && !isFetching) return (
            <>
                <div className='grid grid-cols-1 gap-y-4 py-5 sb-custom'>
                    {
                        data.data.products.edges.map((e, i) => (
                            <Link href={`/product/${e.node.handle}`} className='grid grid-cols-2 gap-x-5 hover:bg-slate-100 py-2 px-2' key={`search-${i}`}>
                                <div className='relative w-28 h-28'>
                                    <Image src={"/placeholder.webp"} layout="fill" />
                                </div>
                                <div className='flex flex-col space-y-2 justify-center'>
                                    <p className='text-sm font-semibold'>{e.node.title}</p>
                                    <p className='text-sm'>{handlePrice(e.node.priceRangeV2.minVariantPrice.amount, e.node.priceRangeV2.maxVariantPrice.amount)}</p>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </>
        )
        return <>
        </>
    }

    const handlePrice = (min, max) => {
        if (min === max) return formatter.format(min)
        else {
            return `${formatter.format(min)}-${formatter.format(max)}`
        }
    }

    useEffect(() => {
        setOpen(false)
    }, [router.query])

    return (
        <>
            <Drawer
                anchor='right'
                open={open}
                onClose={() => setOpen(false)}
                className="z-30"
                keepMounted
            >
                <Box className='w-80 pt-28 px-5 flex flex-col space-y-3 relative'>
                    <form id="search-bar" className="flex flex-col space-y-2 relative">
                        <div className='flex flex-row justify-between items-center'>
                            <p className='font-semibold text-lg'>Searh product</p>
                            <p className='cursor-pointer' onClick={() => setOpen(false)}>x</p>
                        </div>
                        <TextField
                            className='w-full' id="search"
                            placeholder="Search..."
                            variant='outlined'
                            onChange={handleChange}
                        />
                    </form>
                    {handleDisplay()}
                </Box>
            </Drawer>
        </>
    )
}
