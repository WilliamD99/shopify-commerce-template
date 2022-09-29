import axios from "axios";
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import useCustomerGet from "../utils/hooks/useCustomerGet";
import useLoyaltyGetCustomer from "../utils/hooks/useLoyaltyCustomerGet";
import userContext from "../utils/userContext";
import { SideBySideMagnifier } from "react-image-magnifiers";

export default function Test() {
  let customerLoyalty = useLoyaltyGetCustomer();
  let { user } = useContext(userContext);

  useEffect(() => {
    if (user) {
      customerLoyalty.mutate({ email: user.email });
    }
  }, [user]);

  useEffect(() => {
    if (customerLoyalty.data) console.log(customerLoyalty.data);
  }, [customerLoyalty.data]);

  return (
    <>
      {/* <div className="cursor-crosshair">Test</div>
      <div id="magnifier" className="h-96 w-96 relative">
        <SideBySideMagnifier
          imageSrc="/image.png"
          largeImageSrc="/image.png"
          // alwaysInPlace={true}
          // mouseActivation={MOUSE_ACTIVATION.CLICK}
          // touchActivation={TOUCH_ACTIVATION.TAP}
          // dragToMove={true}
        />
      </div> */}
    </>
  );
}
