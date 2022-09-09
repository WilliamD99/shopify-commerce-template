import React, {useState} from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel';
import { useRouter } from 'next/router';

export default function FilterCheckbox() {
    const [isOn, setOn] = useState(false)
    const router = useRouter()
    const routerQuery = router.query

    const handleClick = (e) => {   
        console.log(isOn)    
        if (!isOn) {
            if (!routerQuery.query) {
                routerQuery.query = encodeURIComponent(JSON.stringify([{key: 'is_price_reduced', value: true}]))
                routerQuery.path = "admin"
                routerQuery.reverse = false
                router.push(router, undefined)
            }
            else if (routerQuery.query) {
                let newQuery = JSON.parse(decodeURIComponent(routerQuery.query))
                newQuery.push({key: 'is_price_reduced', value: true})
                routerQuery.query = encodeURIComponent(JSON.stringify(newQuery))
                routerQuery.path = "admin"
                routerQuery.reverse = false
                router.push(router, undefined)
            }
        }
        else {
            let querySales = JSON.parse(decodeURIComponent(routerQuery.query))
            querySales = querySales.filter(e => e.key !== 'is_price_reduced')
            routerQuery.query = encodeURIComponent(JSON.stringify(querySales))

            router.push(router)
        }
    }

    return (
        <>
            <FormControlLabel control={<Checkbox onChange={() => setOn(!isOn)} onClick={handleClick}/>} label={<p className="text-lg">Sales</p>}/>
        </>
    )
}
