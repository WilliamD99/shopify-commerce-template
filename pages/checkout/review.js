import React, { useEffect, useState } from "react";

// Hooks
import useCheckoutCreate from "../../utils/hooks/useCheckoutCreate";
// import useCheckoutUpdateLines from "../../utils/hooks/useCheckoutUpdateLines";
import { decryptText, encryptText } from "../../utils/utils";

// Component
import OrderSummary from "../../components/Checkout/OrderSummary";
import CheckoutInfo from "../../components/Checkout/CheckoutInfo";
import Breadcrumbs from "../../components/Checkout/Breadcrumbs";

export default function Checkout() {
  let [shippingOptions, setShippingOptions] = useState([]);
  let [checkoutId, setCheckoutId] = useState();

  let checkout = useCheckoutCreate();
  // Update the line incase user comeback and add more to cart
  // let checkoutUpdate = useCheckoutUpdateLines()

  // Create checkout when first enter only
  useEffect(() => {
    if (!checkout.isLoading && checkout.data !== undefined) {
      sessionStorage.setItem(
        "checkoutId",
        encryptText(checkout.data.checkoutCreate.checkout.id)
      );
      setCheckoutId(checkout.data.checkoutCreate.checkout.id);
    }
    if (checkout.isError) {
      setCheckoutId(decryptText(sessionStorage.getItem("checkoutId")));
    }
  }, [checkout.isLoading]);

  return (
    <>
      <Breadcrumbs step={2} />

      <div className="px-5 md:px-16 xl:px-44">
        <div className="flex flex-col md:flex-row space-y-5 justify-between">
          <CheckoutInfo setShippingOptions={setShippingOptions} />
          {checkoutId ? (
            <OrderSummary
              checkoutId={checkoutId}
              shippingOptions={shippingOptions}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
