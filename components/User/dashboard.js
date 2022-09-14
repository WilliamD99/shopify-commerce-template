import React, { useContext } from 'react'
import userContext from '../../utils/userContext'
import { formatter } from '../../utils/utils'

import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableFooter from '@mui/material/TableFooter'
import Link from '../common/Link'
import Button from '@mui/material/Button'

export default function Dashboard() {
    let { user } = useContext(userContext)
    return (
        <div className='flex flex-col space-y-10 justify-start'>
            <div>
                <p>Hello, <span className='font-medium'>{user.firstName} {user.lastName}</span></p>
                <p>From this page, you can view your recent orders, or manage your account</p>   
            </div>

            <div className='flex flex-col space-y-5'>
                <p className='text-2xl font-semibold'>Orders</p>
                <Table className='w-2/3 relative rounded-lg bg-slate-100'>
                    <TableHead>
                        <TableRow>
                            <TableCell className='text-base font-semibold' align='right'>Order #</TableCell>
                            <TableCell className='text-base font-semibold' align='right'>Date</TableCell>
                            <TableCell className='text-base font-semibold' align='right'>Total</TableCell>
                            <TableCell className='text-base font-semibold' align='right'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            user.orders.edges.length > 0 ?
                            user.orders.edges.map((e, i) => (
                                <TableRow key={i}>
                                    <TableCell component='th' scope="row" align='right'>#{e.node.orderNumber}</TableCell>
                                    <TableCell align='right'>{new Date(e.node.processedAt).toLocaleDateString()}</TableCell>
                                    <TableCell align='right'>{formatter.format(e.node.totalPriceV2.amount)}</TableCell>
                                    <TableCell align='right'>
                                        <Button className='normal-case' variant="outlined" size="small">View</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                            :
                            <TableRow>
                                <p>No orders found</p>
                            </TableRow>
                        }
                    </TableBody>
                    {/* <TableFooter className="relative">
                        <TableRow>
                            <Button className=''>View All</Button>
                        </TableRow>
                    </TableFooter> */}
                </Table>
            </div>
        </div>
    )
}
