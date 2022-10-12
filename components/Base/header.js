import React, { useEffect, useContext, useState } from "react";
import Cart from "./cart";
import useCustomerGet from "../../utils/hooks/useCustomerGet";
import { accessTokenExist } from "../../utils/utils";
import userContext from "../../utils/userContext";
import Account from "../User/account";
import Link from "../common/Link";

import Slide from "@mui/material/Slide";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Search from "./search";
import DrawerMobile from "./drawerMobile";

export default function Header(props) {
  let customer = useCustomerGet();
  let { user, setUser } = useContext(userContext);
  let [modalOpen, setModalOpen] = useState(false);

  let headerConditionalDisplay = () => {
    if (!user)
      return (
        <>
          <p
            className="text-white cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            Login
          </p>
        </>
      );
    return (
      <div className="relative">
        <Link href="/my-account" className="hover:underline">
          <span className="font-semibold ml-1">
            {user.firstName ? user.firstName : user.email} {user.lastName}
          </span>
        </Link>
      </div>
    );
  };

  // Get customer if there's a token
  useEffect(() => {
    if (!user) {
      let token = accessTokenExist();
      if (token) {
        customer.mutate({ accessToken: token });
      }
    }
  }, []);

  useEffect(() => {
    if (customer.data) {
      setUser(customer.data.customer);
    }
  }, [customer.isLoading]);

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar className="relative  w-full flex flex-col md:flex-row justify-center items-center md:justify-between bg-black pt-2">
            <Link className="text-xl" href="/">
              Ecommerce Theme
            </Link>
            <DrawerMobile />
            <div className="hidden md:flex md:flex-row space-x-10 items-center">
              <Search />
              {headerConditionalDisplay()}
              <Cart />
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Account open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}

const HideOnScroll = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide className="" appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};
