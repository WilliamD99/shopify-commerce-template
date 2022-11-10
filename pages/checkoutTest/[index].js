import React, { useState } from 'react'
import { useQuery, QueryClient, dehydrate } from '@tanstack/react-query'
import { checkoutGet } from '../../lib/serverRequest';
import { decryptText } from '../../utils/utils';
import CheckoutInfo from '../../components/Checkout/CheckoutInfo'
import OrderSummary from '../../components/Checkout/OrderSummary';

export default function Index({ id }) {
    const { data, refetch } = useQuery(
        ["checkout", id],
        () => checkoutGet({ id: decryptText(id) }),
        { onSuccess: data => setCheckoutData(data.data.node) }
    )
    const [checkoutData, setCheckoutData] = useState(data.data.node)

    return (
        <>
            <div className="px-5 mt-10 md:px-16 xl:px-44">
                <div className="flex flex-col md:flex-row space-y-5 justify-between">
                    <CheckoutInfo
                        data={checkoutData}
                        refetch={refetch}
                    />
                    <OrderSummary
                        data={checkoutData}
                        refetch={refetch}
                        checkoutId={decryptText(id)}
                    />
                </div>
            </div>
        </>
    )
}

const queryClient = new QueryClient();
export async function getServerSideProps({ query }) {
    await queryClient.prefetchQuery(["checkout", decodeURIComponent(query.index)], () => checkoutGet({ id: decryptText(decodeURIComponent(query.index)) }))

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            id: decodeURIComponent(query.index)
        }
    }
}