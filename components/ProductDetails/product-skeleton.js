import React from 'react'
import Skeleton from '@mui/material/Skeleton'

export default function ProductSkeleton() {
    return (
        <>
            <div className='flex flex-col w-full lg:justify-between lg:flex-row lg:space-x-5 py-8 px-6'>
                <Skeleton variant="rectangular" className='h-80 lg:h-96 lg:w-7/12' />
                <div className='lg:w-5/12'>
                    <Skeleton className='w-3/4' />
                    <Skeleton className='w-3/4' />
                </div>
            </div>
        </>
    )
}
