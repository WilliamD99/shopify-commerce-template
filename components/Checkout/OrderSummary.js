import React, { useEffect, useState, useContext } from "react";
import cartContext from "../../utils/cartContext";
// Components
import Loading from "../Loading/dataLoading";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import Coupon from "./Coupon";
import { FaTags } from "react-icons/fa";
import Image from "../common/Image";
// Hooks
import useCheckoutShippingLineUpdate from "../../utils/hooks/useCheckoutShippingLineUpdate";
import useCheckoutDiscount from "../../utils/hooks/useCheckoutDiscount";
import useCheckoutDiscountRemove from "../../utils/hooks/useCheckoutDiscountRemove";
import { useRouter } from "next/router";

import { decryptText, encryptText, formatter } from "../../utils/utils";
import { toast } from "react-toastify";

export default function OrderSummary({ data, refetch, isFetching }) {
  const { cart } = useContext(cartContext);
  const [total, setTotal] = useState(0);
  const [totalLine, setTotalLine] = useState(0);
  const [tax, setTax] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);
  const [shippingRateHandle, setShippingRateHandle] = useState([]);
  const [selectedRate, setSelectedRate] = useState("");
  const router = useRouter();

  const checkoutShippingLineUpdate = useCheckoutShippingLineUpdate();
  let checkoutDiscount = useCheckoutDiscount();
  let checkoutDiscountRemove = useCheckoutDiscountRemove();

  useEffect(() => {
    setTotal(data?.totalPriceV2.amount)
    setTax(data?.totalTaxV2.amount)
    setTotalLine(data?.lineItemsSubtotalPrice.amount)
    if (data?.availableShippingRates?.shippingRates[data.availableShippingRates.shippingRates.findIndex(e => e.handle === data.shippingLine?.handle)]?.handle) {
      setSelectedRate(data.availableShippingRates.shippingRates[data.availableShippingRates.shippingRates.findIndex(e => e.handle === data.shippingLine?.handle)]?.handle)
    }
    setShippingRateHandle(data?.availableShippingRates ? data.availableShippingRates.shippingRates : [])
  }, [data])

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
    console.log(selectedRate)
    if (selectedRate === "" || !selectedRate) {
      toast.warning("Please select a delivery method first")
    } else {
      router.push(data.webUrl)
    }
  };

  useEffect(() => {
    if (checkoutShippingLineUpdate.data?.data.checkoutShippingLineUpdate.checkout.id) {
      refetch()
    }
  }, [checkoutShippingLineUpdate.data])

  if (!data) return <div className="w-1/3 bg-slate-100"></div>;

  return (
    <div className="md:mr-10 px-4 md:px-8 py-5 flex flex-col md:w-1/3 relative bg-slate-100">
      {!isFetching ? (
        <></>
      ) : (
        <>
          <Loading />
          <div className="absolute w-full h-full top-0 left-0 backdrop-blur-sm z-40"></div>
        </>
      )}
      <p className="text-2xl text-center font-semibold mb-4">Order Summary</p>

      <Divider />

      <div className="flex flex-col space-y-3 my-5">
        <div className="flex flex-col space-y-3">
          {
            (
              data.lineItems.edges.map((e, i) => (
                <div className="flex flex-row justify-between items-center" key={i}>
                  <div className="flex flex-row items-center space-x-5">
                    <div className="relative h-10 w-10 xl:h-16 xl:w-16">
                      <Image
                        src={e.node.variant.image.url}
                        layout="fill"
                        alt={e.node.title + i}
                      />
                    </div>

                    <div className="flex flex-col">
                      <p className="text-xs xl:text-base font-medium overflow-hidden whitespace-nowrap text-ellipsis">
                        {e.node.title}{" "}
                        <span>
                          {e.node.variant.title !== "Default Title"
                            ? `(${e.node.variant.title})`
                            : ""}
                        </span>
                      </p>
                      <p className="text-xs xl:text-base">
                        Quantity: <span>{e.node.quantity}</span>
                      </p>
                    </div>
                  </div>
                  <div className="ml-5">
                    <p className="text-sm xl:text-base">
                      {formatter.format(e.node.variant.price)}
                    </p>
                  </div>
                </div>
              ))
            )
          }
        </div>

        <Divider />

        <div className="flex flex-row justify-between">
          <p className="text-base xl:text-lg font-medium">Subtotal</p>
          <p className="text-base xl:text-lg font-semibold">
            {formatter.format(totalLine)}
          </p>
        </div>
        {discountValue > 0 ? (
          <div className="ml-2 flex flex-row justify-between">
            <p className="text-sm font-medium flex flex-row items-center">
              Discount: <FaTags className="ml-2" />
            </p>
            <p className="text-sm flex flex-col items-end">
              -{formatter.format(discountValue)}
              <span
                className="cursor-pointer text-xs font-medium hover:opacity-70 hover:underline"
                onClick={() => {
                  let checkoutId = decryptText(
                    sessionStorage.getItem("checkoutId")
                  );
                  checkoutDiscountRemove.mutate({ checkoutId: checkoutId });
                }}
              >
                [Remove]
              </span>
            </p>
          </div>
        ) : (
          <></>
        )}

        <Divider />

        <div className="flex flex-col">
          <p className="text-base xl:text-lg font-medium">Delivery</p>
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
                          color="default"
                          onClick={() => handleShippingRadio(e)}
                        />
                      }
                      label={<p className="text-sm">{e.title}</p>}
                    />
                    <p className="text-sm">
                      {formatter.format(e.priceV2.amount)}
                    </p>
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
          <p className="text-base xl:text-lg font-medium">Tax (GST)</p>
          <p className="text-sm xl:text-base">{formatter.format(tax)}</p>
        </div>

        <Divider />

        <div className="flex flex-row justify-between">
          <p className="text-base xl:text-lg font-medium">Total</p>
          <p className="text-base xl:text-lg font-semibold">
            {formatter.format(total)}
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <p className="text-sm font-medium">Coupon code</p>
          <Coupon checkoutMutation={checkoutDiscount} />
        </div>
      </div>
      <Button
        className="h-12 rounded-full text-white bg-black hover:text-black hover:bg-white hover:border-black"
        variant="outlined"
        onClick={handleComplete}
      >
        Continue to Payment
      </Button>
    </div>
  );
}
