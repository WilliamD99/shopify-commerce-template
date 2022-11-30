import React, { useContext } from "react";
import cartContext from "../../utils/cartContext";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { getCookie } from "../../utils/utils";

export default function CheckoutForm({ setIsProcess }) {
  const stripe = useStripe();
  const elements = useElements();
  const { setCart } = useContext(cartContext);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcess(true);
    let pi = getCookie("pi")

    if (!elements || !stripe) {
      return;
    }

    // const { error } = await stripe.confirmCardPayment(pi, {
    //   payment_method: {
    //     card: elements.getElement("cardNumber"),

    //     billing_details: {
    //       name: name,
    //       address: "",
    //       email: "",
    //       phone: "",
    //     },
    //   },
    // });
    // console.log(error)

    // let { token } = await stripe.createToken(elements.getElement(CardNumberElement))
    // console.log(token)

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
      toast.success("Payment received!");

      setTimeout(() => {
        toast.success("Please be patient, you will be redirect soon!");
      }, 200);

      setTimeout(() => {
        // router.push(
        //   `/checkout/complete/${encodeURIComponent(router.query.index)}`
        // );
      }, 1500);
    }
    setIsProcess(false);
  };

  return (
    <>
      <form
        className="border-2 px-5 py-5 rounded-lg bg-slate-100"
        onSubmit={handleSubmit}
      >
        {/* <CardNumberElement /> */}
        {/* <CardExpiryElement /> */}
        {/* <CardCvcElement /> */}
        <PaymentElement />
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
