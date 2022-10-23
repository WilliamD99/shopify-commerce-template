import React from "react";
import dynamic from "next/dynamic";

const Bubble = dynamic(() => import("./Bubble"));
const Dropdown = dynamic(() => import("./Dropdown"));
// import Bubble from './Bubble'

export default function Options({ options, type, handleFunc }) {
  let handleOptionsDisplay = () => {
    switch (type) {
      case "Bubble":
        return <Bubble options={options} handleFunc={handleFunc} />;
      case "Dropdown":
        return <Dropdown options={options} handleFunc={handleFunc} />;
      case "Default":
        return <></>;
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-5">{handleOptionsDisplay()}</div>
    </>
  );
}
