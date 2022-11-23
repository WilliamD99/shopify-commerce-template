import React, { useEffect, useContext, useState } from "react";
import useCustomerGet from "../../utils/hooks/useCustomerGet";
import userContext from "../../utils/userContext";
import deviceContext from "../../utils/deviceContext";
import dynamic from "next/dynamic";

import Account from "../User/account";
// Mobile Components
// const HeaderMobile = dynamic(() => import("./mobile/header"));
import HeaderMobile from "./mobile/header";
// Desktop Components
// const HeaderDesktopIndex = dynamic(() => import("./desktop"), { ssr: false });
import HeaderDesktopIndex from "./desktop";

export default function Header({ sticky }) {
  let customer = useCustomerGet();
  let { user, setUser } = useContext(userContext);
  let { isMobile } = useContext(deviceContext);
  let [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (customer.data) {
      setUser(customer.data.customer);
    }
  }, [customer.isLoading]);

  return (
    <>
      <div id="header" className={`w-screen z-50 relative ${sticky}`}>
        {isMobile ? (
          <HeaderMobile setModalOpen={setModalOpen} />
        ) : (
          <HeaderDesktopIndex setModalOpen={setModalOpen} />
        )}
      </div>
    </>
  );
}
