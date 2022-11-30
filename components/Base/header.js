import React, { useEffect, useContext } from "react";
import useCustomerGet from "../../utils/hooks/useCustomerGet";
import userContext from "../../utils/userContext";
import deviceContext from "../../utils/deviceContext";

// Mobile Components
// const HeaderMobile = dynamic(() => import("./mobile/header"));
import HeaderMobile from "./mobile/header";
// Desktop Components
// const HeaderDesktopIndex = dynamic(() => import("./desktop"), { ssr: false });
import HeaderDesktopIndex from "./desktop";

export default function Header({ sticky }) {
  let customer = useCustomerGet();
  let { setUser } = useContext(userContext);
  let { isMobile } = useContext(deviceContext);
  useEffect(() => {
    if (customer.data) {
      setUser(customer.data.customer);
    }
  }, [customer.isLoading]);

  return (
    <>
      <div id="header" className={`w-screen z-40 ${sticky}`}>
        {isMobile ? <HeaderMobile /> : <HeaderDesktopIndex />}
      </div>
    </>
  );
}
