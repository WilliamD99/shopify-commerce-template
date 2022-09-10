import React, {useEffect, useState} from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel';
import { useRouter } from 'next/router';

export default function FilterCheckbox() {
    const [isOn, setOn] = useState(false)
    const [checked, setChecked] = useState(false)
    const router = useRouter()
    const routerQuery = router.query

    useEffect(() => {
        if (router.isReady && routerQuery.sales) {
            setChecked(routerQuery.sales === 'true')
        }
    }, [routerQuery])

    const handleClick = (e) => {   
        if (!checked) {
            routerQuery.sales = true
            if (!routerQuery.path) routerQuery.path = 'admin'
            if (!routerQuery.reverse) routerQuery.reverse = false
            if (routerQuery.cursor) delete routerQuery.cursor
            router.push({
                pathname: window.location.pathname,
                query: routerQuery
            }, undefined)

            setChecked(true)
        }

        else {
            delete routerQuery.sales
            router.push({
                pathname: window.location.pathname,
                query: routerQuery
            }, undefined)
            setChecked(false)
        }
    }

    return (
        <>
            <FormControlLabel control={<Checkbox checked={checked} onChange={() => setOn(!isOn)} onClick={handleClick}/>} label={<p className="text-lg">Sales</p>}/>
        </>
    )
}
