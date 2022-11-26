import React, { useState, useContext } from "react";
import cartContext from "../../utils/cartContext";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import { getCookie } from "../../utils/utils";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";

import { AiFillLock, AiFillQuestionCircle } from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";

const inputStyle = {
  iconColor: "black",
  color: "black",
  fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
  fontSize: "16px",
  fontSmoothing: "antialiased",
};

export default function CheckoutForm({ setIsProcess }) {
  const stripe = useStripe();
  const elements = useElements();
  const { setCart } = useContext(cartContext);
  const router = useRouter();
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcess(true);
    let pi = getCookie("pi");

    if (elements == null) {
      return;
    }
    if (name === "" || !name) {
      toast.error("Please enter the name on your card");
      setIsProcess(false);
      return;
    }

    const { error } = await stripe.confirmCardPayment(pi, {
      payment_method: {
        card: elements.getElement("cardNumber"),

        billing_details: {
          name: name,
          address: "",
          email: "",
          phone: "",
        },
      },
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
        router.push(
          `/checkout/complete/${encodeURIComponent(router.query.index)}`
        );
      }, 1000);
    }
    setIsProcess(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="relative pb-5 border-2 rounded-lg w-full flex flex-col space-y-3 justify-center items-center shadow-lg bg-slate-100">
          <div className="bg-white w-full py-3 px-5 rounded-tl-lg rounded-tr-lg">
            <p>Credit Card</p>
          </div>
          <div className="w-full px-5 pt-3">
            <div className="text-xs  mb-1 relative flex flex-row space-x-1 items-center text-gray-500">
              <p className="mb-0">Card Number</p>
              <Tooltip title="All transactions are secure and encrypted." arrow>
                <span>
                  <AiFillLock className="text-lg" />
                </span>
              </Tooltip>
            </div>
            <div className="px-2 py-2 w-full border-2 rounded-lg bg-white">
              <CardNumberElement
                options={{
                  style: {
                    base: {},
                    empty: {},
                  },
                }}
              />
            </div>
          </div>
          <div className="w-full px-5">
            <div className="text-xs  mb-1 relative flex flex-row space-x-1 items-center text-gray-500">
              <p className="mb-0">Name on Card</p>
            </div>
            <div className="">
              <TextField
                size="small"
                className="bg-white w-full text-sm"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 px-5 gap-4 w-full">
            <div className="w-full">
              <p className="text-xs mb-1 text-gray-500">Expiry Date</p>
              <div className="px-2 py-2 bg-white border-2 rounded-lg w-full">
                <CardExpiryElement />
              </div>
            </div>
            <div className="w-full">
              <div className="text-xs mb-1 relative flex flex-row space-x-1 items-center text-gray-500">
                <p className="mb-0">Security Code</p>
                <Tooltip
                  title="3-digit security code on the back of your card."
                  arrow
                >
                  <span className=" ">
                    <AiFillQuestionCircle className="text-lg" />
                  </span>
                </Tooltip>
              </div>
              <div className="relative px-2 py-2 bg-white border-2 rounded-lg w-full">
                <CardCvcElement className="z-40" />
              </div>
            </div>
          </div>
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
    </>
  );
}
// tok_1M7ShnDLvTNEyZ89o2cuDTp1
// pm_1M7ShnDLvTNEyZ89WDtsCJRD
