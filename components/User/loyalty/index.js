import React, { useEffect, useContext, useState } from "react";
import userContext from "../../../utils/userContext";
import useLoyaltyGetCustomer from "../../../utils/hooks/useLoyaltyCustomerGet";

import Loading from "../../Loading/dataLoading";
import History from "./history";

export default function Loyalty() {
  let [data, setData] = useState();
  let { user } = useContext(userContext);
  let customerLoyalty = useLoyaltyGetCustomer();

  useEffect(() => {
    if (user) {
      customerLoyalty.mutate({ email: user.email });
    }
  }, [user]);

  useEffect(() => {
    if (customerLoyalty.data) {
      console.log(customerLoyalty.data);
      setData(customerLoyalty.data);
    }
  }, [customerLoyalty.data]);

  if (customerLoyalty.isIdle) return <></>;
  else if (customerLoyalty.isLoading) return <Loading />;

  return (
    <>
      <div>Loyalty</div>
      <History data={customerLoyalty.data.history_items} />
    </>
  );
}
