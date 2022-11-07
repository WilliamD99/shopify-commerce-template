import React, { useEffect, useContext, useState } from "react";
import userContext from "../../../utils/userContext";
import { useQuery } from "@tanstack/react-query";

import Loading from "../../Loading/dataLoading";
import History from "./history";
import Profile from "./profile";
import { getCookie } from "../../../utils/utils";
import { customer_get_loyalty } from "../../../utils/api/requests";

export default function Loyalty() {
  let { user } = useContext(userContext);

  const { data, isFetching } = useQuery(['loyalty', getCookie('tn')], () => customer_get_loyalty({ email: user.email }))
  console.log(data)

  if (!data) return <></>
  else if (isFetching) return <Loading />
  else {
    return (
      <>
        <p className="text-xl lg:text-2xl font-bold px-5 mb-10">Loyalty Program</p>

        <div className="flex flex-col space-y-10 lg:mr-20">
          <Profile data={data} />
          <div className="grid grid-rows-3 grid-cols-3 gap-x-10">
            <History data={data.history_items} />
            <div className="flex flex-col space-y-2">
              <div className="border-2 lg:w-full w-1/2 h-52 z-50 bg-white rounded-md px-3 py-3 flex flex-col space-y-2">
                <p className="text-center font-semibold text-lg">Points</p>
                <div className="flex flex-col space-y-2">
                  <div className="grid grid-cols-3">
                    <p className="col-span-2">Points Balance:</p>
                    <p>{data.points_balance}</p>
                  </div>
                  <div className="grid grid-cols-3">
                    <p className="col-span-2">Points Earned:</p>
                    <p>{data.points_earned}</p>
                  </div>
                  <div className="grid grid-cols-3">
                    <p className="col-span-2">Redeemed:</p>
                    <p>{data.perks_redeemed}</p>
                  </div>
                  <div className="grid grid-cols-3">
                    <p className="col-span-2">Credit:</p>
                    <p>{data.credit_balance}</p>
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
        </div>
      </>
    );
  }
}
