import React from "react";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";

export default function ListPagination() {
  return (
    <>
      <div className="w-screen bg-slate-100 -mb-5 xl:-mb-10 h-20 flex flex-row justify-center items-center space-x-10">
        <div className="flex flex-row items-center space-x-3">
          <IoIosArrowRoundBack className="text-lg" />
          <p>Previous</p>
        </div>
        <div className="flex flex-row items-center space-x-3">
          <p>Next</p>
          <IoIosArrowRoundForward className="text-lg" />
        </div>
      </div>
    </>
  );
}
