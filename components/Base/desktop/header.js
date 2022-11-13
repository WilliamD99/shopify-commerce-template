import React, { useContext } from "react";
import userContext from "../../../utils/userContext";
import LoginButton from "../loginButton";

export default function Header({ setModalOpen }) {
  const { user } = useContext(userContext);

  let headerConditionalDisplay = () => {
    console.log(user);
    if (user?.state === "loading") {
      return <p>Loading</p>;
    } else if (user?.state === "none")
      return (
        <>
          <p
            className="text-black font-medium text-sm cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            Sign In
          </p>
        </>
      );
    else {
      return <LoginButton />;
    }
  };

  return (
    <>
      <div className="hidden md:flex md:flex-row space-x-8 items-center">
        <p className="text-sm font-medium">FAQ</p>
        {headerConditionalDisplay()}
      </div>{" "}
    </>
  );
}
