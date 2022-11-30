import React, { useContext, useState, useEffect } from "react";
import cartContext from "../../utils/cartContext";
import {
  useStripe,
  useElements,
  PaymentElement,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { getCookie, setCookie } from "../../utils/utils";
import { Divider } from "@mui/material";

export default function CheckoutForm({ setIsProcess, checkout }) {
  const stripe = useStripe();
  const elements = useElements();
  const { setCart } = useContext(cartContext);
  const router = useRouter();
  const [paymentRequest, setPaymentRequest] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcess(true);

    if (!elements || !stripe) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      toast.error(`${error.message}, please try again or use a different card`);
    } else {
      setCart([]);
      localStorage.setItem("items", "[]");
      sessionStorage.removeItem("checkoutId");
      toast.success("Payment received! You'll be redirected soon");

      setTimeout(() => {
        setCookie("pi", "");
        router.push(
          `/checkout/complete/${encodeURIComponent(router.query.index)}`
        );
      }, 1500);
    }
    setIsProcess(false);
  };

  // Payment request button
  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: "CA",
        currency: "cad",
        total: {
          label: "Pay for Order",
          amount: parseInt(parseFloat(checkout.totalPriceV2.amount) * 100),
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });
      // Check the availability of the Payment Request API.
      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
        }
      });
      pr.on("paymentmethod", async (ev) => {
        let pi = getCookie("pi");
        const { paymentIntent, error } = await stripe.confirmCardPayment(
          pi,
          { payment_method: ev.paymentMethod.id },
          { handleActions: false }
        );

        if (error) {
          // Report to the browser that the payment failed, prompting it to
          // re-show the payment interface, or show an error message and close
          // the payment interface.
          ev.complete("fail");
          toast.error("Something went wrong, please try again or contact us");
        } else {
          // Report to the browser that the confirmation was successful, prompting
          // it to close the browser payment method collection interface.
          ev.complete("success");
          // Check if the PaymentIntent requires any actions and if so let Stripe.js
          // handle the flow. If using an API version older than "2019-02-11"
          // instead check for: `paymentIntent.status === "requires_source_action"`.
          if (paymentIntent.status === "requires_action") {
            // Let Stripe.js handle the rest of the payment flow.
            const { error } = await stripe.confirmCardPayment(pi);
            if (error) {
              // The payment failed -- ask your customer for a new payment method.
              console.log("test");
            } else {
              // The payment has succeeded.
              console.log("test1");
            }
          } else {
            setCart([]);
            localStorage.setItem("items", "[]");
            sessionStorage.removeItem("checkoutId");
            setTimeout(() => {
              setCookie("pi", "");
              router.push(
                `/checkout/complete/${encodeURIComponent(router.query.index)}`
              );
            }, 2000);
            // The payment has succeeded.
          }
        }
      });
    }
  }, [stripe]);

  return (
    <>
      <form
        className="border-2 px-5 py-5 rounded-lg bg-slate-100"
        onSubmit={handleSubmit}
      >
        {paymentRequest ? (
          <>
            <div className="mb-2">
              <PaymentRequestButtonElement options={{ paymentRequest }} />
            </div>
            <div className="my-4 w-full overflow-hidden relative flex justify-around flex-row items-center space-x-3">
              <Divider className="w-full" />
              <span className="text-center">Or</span>
              <Divider className="w-full" />
            </div>
          </>
        ) : (
          <></>
        )}
        <PaymentElement
          options={{ wallets: { applePay: "never", googlePay: "never" } }}
        />
      </form>
      <Button
        type="submit"
        className="normal-case text-black border-black mt-5"
        variant="outlined"
        onClick={handleSubmit}
      >
        Pay Now
      </Button>
    </>
  );
}
