import React, { useEffect, useContext, useState, useRef } from "react";
import useCustomerGet from "../../utils/hooks/useCustomerGet";
import userContext from "../../utils/userContext";
import deviceContext from "../../utils/deviceContext";
import { gsap } from "../../utils/utils";
import dynamic from "next/dynamic";

const DrawerMobile = dynamic(() => import("./drawerMobile"));
import Cart from "./cart";
import Account from "../User/account";
import Link from "../common/Link";
import Toolbar from "@mui/material/Toolbar";
import Search from "./search";
// import DrawerMobile from "./drawerMobile";
import { AiOutlineHeart } from "react-icons/ai";
import Badge from "@mui/material/Badge";
import Navigation from "./navigation";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import LoginButton from "./loginButton";

export default function Header({ sticky }) {
  let customer = useCustomerGet();
  let { user, setUser } = useContext(userContext);
  let { isMobile } = useContext(deviceContext);
  let [modalOpen, setModalOpen] = useState(false);
  let [wlCount, setWlCount] = useState(0);
  let wlRef = useRef(gsap.timeline({}));

  let headerConditionalDisplay = () => {
    if (user.state === "loading") {
      return <p>Loading</p>;
    } else if (user.state === "none")
      return (
        <>
          <p
            className="text-black font-medium text-lg cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            Login
          </p>
        </>
      );
    return <LoginButton />;
  };

  useEffect(() => {
    if (customer.data) {
      setUser(customer.data.customer);
    }
  }, [customer.isLoading]);

  useEffect(() => {
    if (user.state !== "loading" && user.state !== "none") {
      wlRef.current
        .to("#wlBadge", { scale: 1.2, duration: 0.3 })
        .to("#wlBadge", { scale: 1, duration: 0.3 });
      setWlCount(
        JSON.parse(
          user.metafields[
            user.metafields.findIndex((e) => e.key === "wishlist")
          ].value
        ).length
      );
    }
    return () => wlRef.current.kill();
  }, [user]);

  return (
    <>
      <div id="header" className={`border-b-2 w-screen ${sticky}`}>
        <Toolbar className="w-full flex flex-col md:flex-row justify-center items-center md:justify-between xl:px-16 bg-slate-100">
          {!isMobile ? (
            <div className="flex flex-row space-x-3 items-center">
              <FaInstagram className="text-orange-500 text-xl" />

              <FaFacebook className="text-blue-500 text-xl" />
            </div>
          ) : (
            <></>
          )}
          {isMobile ? <DrawerMobile /> : <></>}
          <div className="hidden md:flex md:flex-row space-x-10 items-center">
            {headerConditionalDisplay()}

            {user ? (
              <Link href="/my-account">
                <Badge id="wlBadge" badgeContent={wlCount}>
                  <AiOutlineHeart className="text-xl" />
                </Badge>
              </Link>
            ) : (
              <></>
            )}
            <Cart />
          </div>
        </Toolbar>
        {!isMobile ? (
          <div className="bg-white flex flex-row justify-between items-center py-8 px-10">
            <Link className="text-xl text-black " href="/">
              Ecommerce Theme
            </Link>
            <Navigation />
            <Search />
          </div>
        ) : (
          <></>
        )}
      </div>
      <Account open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}
