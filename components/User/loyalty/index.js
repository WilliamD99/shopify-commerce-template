import React, { useEffect, useContext, useState } from "react";
import userContext from "../../../utils/userContext";
import useLoyaltyGetCustomer from "../../../utils/hooks/useLoyaltyCustomerGet";
import { useQuery } from "@tanstack/react-query";

import Loading from "../../Loading/dataLoading";
import History from "./history";
import Profile from "./profile";
import { getCookie } from "../../../utils/utils";
import { customer_get_loyalty } from "../../../utils/api/requests";

export default function Loyalty() {
  // let [data, setData] = useState();
  let { user } = useContext(userContext);
  let customerLoyalty = useLoyaltyGetCustomer();

  const { data } = useQuery(['loyalty', getCookie('tn')], () => customer_get_loyalty({ email: user.email }))
  console.log(data)

  // useEffect(() => {
  //   if (user) {
  //     customerLoyalty.mutate({ email: user.email });
  //   }
  // }, [user]);

  // useEffect(() => {
  //   if (customerLoyalty.data) {
  //     setData(customerLoyalty.data);
  //     console.log(customerLoyalty.data);
  //   }
  // }, [customerLoyalty.data]);

  // if (customerLoyalty.isIdle) return <></>;
  // else if (customerLoyalty.isLoading) return <Loading />;

  return (
    <>
      {/* <p className="text-2xl font-bold mb-10">Loyalty Program</p>

      <div className="flex flex-col space-y-10 mr-20">
        <Profile data={customerLoyalty.data} />
        <div className="grid grid-rows-3 grid-cols-4 gap-x-10">
          <History data={customerLoyalty.data.history_items} />
          <div className="flex flex-col space-y-2">
            <div className="border-2 lg:w-full w-1/2 h-52 z-50 bg-white rounded-md px-3 py-3 flex flex-col space-y-2">
              <p className="text-center font-semibold text-lg">Points</p>
              <div className="flex flex-col space-y-2">
                <div className="grid grid-cols-3">
                  <p className="col-span-2">Points Balance:</p>
                  <p>{customerLoyalty.data.points_balance}</p>
                </div>
                <div className="grid grid-cols-3">
                  <p className="col-span-2">Points Earned:</p>
                  <p>{customerLoyalty.data.points_earned}</p>
                </div>
                <div className="grid grid-cols-3">
                  <p className="col-span-2">Redeemed:</p>
                  <p>{customerLoyalty.data.perks_redeemed}</p>
                </div>
                <div className="grid grid-cols-3">
                  <p className="col-span-2">Credit:</p>
                  <p>{customerLoyalty.data.credit_balance}</p>
                </div>
              </div>
            </div>
            <div className="bg-white border-2 px-3 py-3">
              <p className="text-lg font-semibold text-center">
                Purchase History
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
