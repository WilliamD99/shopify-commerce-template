import React, { useContext } from "react";
import userContext from "../../../utils/userContext";
import loginContext from "../../../utils/loginContext";
import LoginButton from "../loginButton";
import Link from "../../common/Link";

export default function Header() {
  const { user } = useContext(userContext);
  const { setUserModalShow } = useContext(loginContext);

  let headerConditionalDisplay = () => {
    if (user?.state === "loading") {
      return <p>Loading</p>;
    } else if (user?.state === "none")
      return (
        <>
          <p
            className="text-black font-medium text-sm cursor-pointer"
            onClick={() => setUserModalShow(true)}
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
        <Link href="/faq" className="text-sm text-black">
          FAQ
        </Link>
        {headerConditionalDisplay()}
      </div>{" "}
    </>
  );
}
