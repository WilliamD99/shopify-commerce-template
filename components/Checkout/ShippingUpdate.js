import React from 'react'
import useCheckoutShippingUpdate from '../../utils/hooks/checkoutShippingUpdate'

export default function ShippingUpdate() {
    // Update shipping
    let checkoutShippingUpdate = useCheckoutShippingUpdate()

    return (
        <>
            <p onClick={() => {
                checkoutShippingUpdate.mutate({
                    address: {
                        lastName: "Doe",
                        firstName: "John",
                        address1: "123 Test str",
                        province: "BC",
                        country: "Canada",
                        zip: "V5H9Z8",
                        city: "Vancouver"
                    }
                })
            }}
            >
                Shipping
            </p>
        </>
    )
}
