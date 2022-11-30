import React, { useState, useEffect, useContext } from "react";
import userContext from "../utils/userContext";
import { useRouter } from "next/router";

export default function Err() {
  const { user } = useContext(userContext);
  const router = useRouter();

  useEffect(() => {
    if (!user.state) router.push("/my-account/dashboard/0");
  }, [user]);

  return (
    <>
      <div className="flex flex-col justify-center items-center lg:mt-32">
        <p className="font-bold text-xl">Please Login first</p>
      </div>
    </>
  );
}
