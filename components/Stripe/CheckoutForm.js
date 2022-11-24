import React, { useEffect } from "react";
import {
  CardElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Button from "@mui/material/Button";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //     type: 'card',
    //     card: elements.getElement(CardElement),
    // });
    // console.log(paymentMethod)
    // let token = await stripe.createToken(elements.getElement(CardElement))
    // console.log(token)
    // const { paymentIntent, error } = stripe.confirmCardPayment("pi_3M7T29DLvTNEyZ8917d8HhId_secret_J7pzvUnsSrlpsaA8HUYE7AnWH", {
    //     payment_method: {
    //         card: elements.getElement(CardElement),
    //         billing_details: {
    //             name: "Nam Doan"
    //         }
    //     }
    // })
    // console.log(paymentIntent, error)
  };

  useEffect(() => {}, []);

  return (
    <form className="mt-20 mx-20" onSubmit={handleSubmit}>
      <div className="relative px-5 py-5 w-96 flex flex-col space-y-3 justify-center items-center bg-slate-100">
        <CardElement className="px-5 py-5 w-full" />
        <Button
          variant="outlined"
          type="submit"
          size="small"
          disabled={!stripe || !elements}
          className="text-white normal-case bg-black border-black rounded-full w-44 hover:bg-white hover:text-black"
        >
          Pay Now
        </Button>
      </div>
    </form>
  );
}
// tok_1M7ShnDLvTNEyZ89o2cuDTp1
// pm_1M7ShnDLvTNEyZ89WDtsCJRD
