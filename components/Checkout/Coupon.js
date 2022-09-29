import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { decryptText } from "../../utils/utils";

export default function Coupon({ checkoutMutation }) {
  let [errorCode, setErrorCode] = useState();

  const handleClick = () => {
    let input = document.querySelector("#discount");

    let checkoutId = decryptText(sessionStorage.getItem("checkoutId"));
    if (input.value) {
      checkoutMutation.mutate({
        checkoutId: checkoutId,
        discountCode: input.value,
      });
    } else {
      setErrorCode("Please input a code first");
    }
  };

  useEffect(() => {
    console.log(checkoutMutation.data);
    if (checkoutMutation.data) {
      if (
        checkoutMutation.data.data.checkoutDiscountCodeApplyV2
          .checkoutUserErrors.length > 0
      ) {
        if (
          checkoutMutation.data.data.checkoutDiscountCodeApplyV2
            .checkoutUserErrors[0].code === "DISCOUNT_NOT_FOUND"
        ) {
          setErrorCode("No discount code matching");
          setTimeout(() => {
            setErrorCode();
          }, 2000);
        }
      }
    }
  }, [checkoutMutation.isLoading]);

  return (
    <>
      <div className="flex flex-row space-x-2">
        <TextField
          id="discount"
          label="Enter your code"
          variant="standard"
          className="py-1"
        />
        <Button onClick={handleClick} className="normal-case text-sm">
          Apply
        </Button>
      </div>
      {errorCode ? (
        <p id="discount-msg" className="text-sm text-red-400">
          {errorCode}
        </p>
      ) : (
        <></>
      )}
    </>
  );
}
