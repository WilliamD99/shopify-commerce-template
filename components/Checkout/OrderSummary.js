import React, { useEffect, useState, useContext } from "react";
import cartContext from "../../utils/cartContext";
// Components
import Loading from '../Loading/dataLoading'
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import Coupon from "./Coupon";
import { FaTags } from 'react-icons/fa'
import Image from '../common/Image'
// Hooks
import useCheckoutShippingLineUpdate from "../../utils/hooks/useCheckoutShippingLineUpdate";
import useCreatePaymentIntent from "../../utils/hooks/useCreatePaymentIntent";
import useCheckoutGet from "../../utils/hooks/useCheckoutGet";
import useCheckoutDiscount from "../../utils/hooks/useCheckoutDiscount";
import useCheckoutDiscountRemove from '../../utils/hooks/useCheckoutDiscountRemove'

// import { useRouter } from "next/router";
import { decryptText, encryptText, formatter } from "../../utils/utils";
// import axios from "axios";

export default function OrderSummary({ shippingOptions, checkoutId }) {
  const { cart } = useContext(cartContext);
  const [total, setTotal] = useState(0);
  const [totalLine, setTotalLine] = useState(0);
  const [tax, setTax] = useState(0);
  const [discountValue, setDiscountValue] = useState(0)
  const [shippingRateHandle, setShippingRateHandle] = useState([]);
  const [selectedRate, setSelectedRate] = useState("");
  const [ready, setReady] = useState(false); // Detect if user has finish confirm all the info
  const checkoutShippingLineUpdate = useCheckoutShippingLineUpdate();
  const pi = useCreatePaymentIntent();
  // const router = useRouter();

  let checkout = useCheckoutGet();
  let checkoutDiscount = useCheckoutDiscount()
  let checkoutDiscountRemove = useCheckoutDiscountRemove()

  useEffect(() => {
    checkout.mutate({ id: checkoutId });
  }, [shippingOptions, checkoutShippingLineUpdate.data, cart, checkoutDiscount.data, checkoutDiscountRemove.data]);

  useEffect(() => {
    if (checkout.data) {
      let discount = 0
      checkout.data.node.lineItems.edges.forEach(item => {
        if (item.node.discountAllocations.length > 0) {
          discount += parseFloat(item.node.discountAllocations[0].allocatedAmount.amount)
        }
      })
      setDiscountValue(discount)
      setTotalLine(
        parseFloat(checkout.data.node.lineItemsSubtotalPrice.amount)
      );
      setTax(parseFloat(checkout.data.node.totalTaxV2.amount));
      setTotal(parseFloat(checkout.data.node.totalPriceV2.amount));
      if (checkout.data.node.availableShippingRates) {
        setShippingRateHandle(
          checkout.data.node.availableShippingRates.shippingRates
        );
      }
      if (checkout.data.node.shippingLine) {
        setSelectedRate(checkout.data.node.shippingLine.handle);
      }
    }
  }, [checkout.data, checkoutShippingLineUpdate.data]);

  const handleShippingRadio = (e) => {
    let id = sessionStorage.getItem("checkoutId");
    if (id) {
      id = decryptText(id);
      checkoutShippingLineUpdate.mutate({
        checkoutId: id,
        shippingRateHandle: e.handle,
      });
    }
  };

  const handleComplete = async () => {
    // let data = await axios.post("/api/storefront/mutation/checkout-complete-stripe", {
    //     data: {
    //         checkoutId: decryptText(sessionStorage.getItem('checkoutId'))
    //     }
    // })
    // console.log(data.data)
    if (!sessionStorage.getItem("client")) {
      pi.mutate({
        amount: Math.ceil(total.toFixed(2) * 100),
        currency: "cad",
        method: ["card"],
      });
    }
    setReady(true);
  };

  // If created pi succeed, log it to sessionStorage
  useEffect(() => {
    if (pi.data && !pi.isLoading) {
      sessionStorage.setItem("client", encryptText(pi.data.data));
    }
  }, [pi.isLoading]);

  // If ready is true is done creating pi, re-route
  // useEffect(() => {
  //     if (ready && !pi.isLoading && pi.data) {
  //         router.push('/checkout/payment')
  //     }
  //     if (ready && !pi.isLoading && !pi.data) {
  //         console.log(ready)
  //         console.log(!pi.isLoading)
  //         console.log(!pi.data)
  //     }
  // }, [ready, pi.isLoading])

  if (!cart) return <div className="w-1/3 bg-slate-100"></div>;

  return (
    <div className="mr-10 px-8 py-5 flex flex-col w-1/3 relative bg-slate-100">
      {!checkoutShippingLineUpdate.isLoading &&
      !checkout.isLoading &&
      !pi.isLoading ? (
        <></>
      ) : (
        <>
          <Loading />
          <div className="absolute w-full h-full top-0 left-0 backdrop-blur-sm z-40"></div>
        </>
      )}
      <p className="text-2xl text-center font-semibold mb-8">Order Summary</p>

      <Divider />

      <div className="flex flex-col space-y-3 my-5">
        <div className="flex flex-col space-y-3">
          {
            checkout.data ?
            checkout.data.node.lineItems.edges.map((e, i) => (
              <div className="flex flex-row justify-between" key={i}>
                <div className="flex flex-row items-center space-x-5">
                  <div className="relative h-10 w-10">
                    <Image src={e.node.variant.image.url} layout='fill' alt={e.node.title + i}/>
                  </div>

                  <div className="flex flex-col">
                    <p className="text-xs font-medium overflow-hidden whitespace-nowrap text-ellipsis">{e.node.title} <span>{e.node.variant.title !== 'Default Title' ? `(${e.node.variant.title})` : ''}</span></p>
                    <p className="text-xs">Quantity: <span>{e.node.quantity}</span></p>
                  </div>

                </div>
                <div className="ml-5">
                  <p className="text-sm">{formatter.format(e.node.variant.price)}</p>
                </div>
              </div>
            ))
            :
            <></>
          }
        </div>

        <Divider />

        <div className="flex flex-row justify-between">
          <p className="text-base font-medium">Subtotal</p>
          <p className="text-base font-semibold">{formatter.format(totalLine)}</p>
        </div>
        {
          discountValue > 0 ?
          <div className="ml-2 flex flex-row justify-between">
            <p className="text-sm font-medium flex flex-row items-center">Discount: <FaTags className="ml-2"/></p>
            <p className="text-sm flex flex-col items-end">-{formatter.format(discountValue)} 
              <span className="cursor-pointer text-xs font-medium hover:opacity-70 hover:underline" onClick={() => {
                let checkoutId = decryptText(sessionStorage.getItem('checkoutId'))
                checkoutDiscountRemove.mutate({checkoutId: checkoutId})
              }}>[Remove]</span>
            </p>
          </div>
          :
          <></>
        }

        <Divider />

        <div className="flex flex-col">
          <p className="text-base font-medium">Delivery</p>
          <FormControl className="mt-2 pl-5">
            <RadioGroup value={selectedRate}>
              {shippingRateHandle.length > 0 ? (
                shippingRateHandle.map((e, i) => (
                  <div
                    key={i}
                    className="flex flex-row justify-between items-center"
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          size="small"
                          value={e.handle}
                          onClick={() => handleShippingRadio(e)}
                        />
                      }
                      label={<p className="text-sm">{e.title}</p>}
                    />
                    <p className="text-sm">{formatter.format(e.priceV2.amount)}</p>
                  </div>
                ))
              ) : (
                <div>
                  <p>
                    No delivery options found. Please confirm your address or
                    make sure you are in the delivery zone.
                  </p>
                </div>
              )}
            </RadioGroup>
          </FormControl>
        </div>

        <Divider />

        <div className="flex flex-row justify-between">
          <p className="text-base font-medium">Tax (GST)</p>
          <p className="text-sm">{formatter.format(tax)}</p>
        </div>

        <Divider />

        <div className="flex flex-row justify-between">
          <p className="text-base font-medium">Total</p>
          <p className="text-base font-semibold">{formatter.format(total)}</p>
        </div>

        <div className="flex flex-col space-y-2">
          <p className="text-sm font-medium">Coupon code</p>
          <Coupon checkoutMutation={checkoutDiscount}/>
        </div>
      </div>
      <Button variant="outlined" onClick={handleComplete}>
        Continue to Payment
      </Button>
    </div>
  );
}
