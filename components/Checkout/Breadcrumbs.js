import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '../common/Link'

export default function CheckoutBreadcrumbs({step}) {

    return (
        <Breadcrumbs>
            <Link className="text-black" href="/cart">
                Cart
            </Link>
            <Link className={`${step > 1 ? "text-black" : ""}`} href="/checkout/review">
                Info
            </Link>
            <Link className={`${step > 2 ? "text-black" : ""}`} href="/checkout/payment">
                Payment
            </Link>
            <p className={`${step > 3 ? "text-black" : ""}`}>
                Complete
            </p>
        </Breadcrumbs>
    )
}
