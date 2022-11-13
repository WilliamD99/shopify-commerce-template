import React, { useEffect, useContext, useState } from "react";
import useCustomerGet from "../../utils/hooks/useCustomerGet";
import userContext from "../../utils/userContext";
import deviceContext from "../../utils/deviceContext";
import dynamic from "next/dynamic";

import Account from "../User/account";
import { accessTokenExist } from "../../utils/utils";
// Mobile Components
const HeaderMobile = dynamic(() => import("./mobile/header"));
// Desktop Components
const HeaderDesktopIndex = dynamic(() => import("./desktop"), { ssr: false });

export default function Header({ sticky }) {
  let customer = useCustomerGet();
  let { user, setUser } = useContext(userContext);
  let { isMobile } = useContext(deviceContext);
  let [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (customer.data) {
      console.log(customer);
      setUser(customer.data.customer);
    }
  }, [customer.isLoading]);

  return (
    <>
      <div id="header" className={`border-b-2 w-screen ${sticky}`}>
        {isMobile ? (
          <HeaderMobile setModalOpen={setModalOpen} />
        ) : (
          <HeaderDesktopIndex setModalOpen={setModalOpen} />
        )}
      </div>
      <Account open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}
