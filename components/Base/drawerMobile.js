import React, { useState, useContext, useEffect } from "react";
import userContext from "../../utils/userContext";
import { useRouter } from "next/router";

import { AiOutlineMenu, AiFillShop } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { FaQuestion } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Cart from "./cart";
import Divider from "@mui/material/Divider";
import Link from "../common/Link";
import { MdAccountCircle } from "react-icons/md";

export default function DrawerMobile({ setModalOpen }) {
  const [open, setOpen] = useState(false);
  const { user } = useContext(userContext);
  const router = useRouter();

  const toggleDrawer = (e) => {
    if ((e.type === "keydown" && e.key === "Tab") || e.key === "Shift") {
      return;
    }
    setOpen(!open);
  };

  useEffect(() => {
    setOpen(false);
  }, [router.query]);

  return (
    <>
      <div className="md:hidden flex flex-row w-full items-center justify-between my-3">
        <AiOutlineMenu className="text-xl" onClick={toggleDrawer} />
        <Cart />
      </div>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onOpen={toggleDrawer}
        onClose={toggleDrawer}
      >
        <div className="w-80 pt-5 flex flex-col space-y-3">
          <p className="text-center text-xl font-bold mb-5">Ecommerce Theme</p>

          <div className="pl-5">
            <div className="flex flex-row space-x-4 items-center">
              <AiFillShop className="text-xl" />
              <Link className="text-lg" href="/shop">
                Shop
              </Link>
            </div>
          </div>
          <Divider className="opacity-80" />

          <div className="pl-5">
            <div className="flex flex-row space-x-4 items-center">
              <FaQuestion className="text-xl" />
              <Link className="text-lg" href="/faq">
                FAQ
              </Link>
            </div>
          </div>
          <Divider className="opacity-80" />

          <div className="pl-5">
            <div className="flex flex-row space-x-4 items-center">
              <MdSupportAgent className="text-xl" />
              <Link className="text-lg" href="#">
                Support
              </Link>
            </div>
          </div>
          <Divider className="opacity-80" />

          <div className="pl-5">
            <div className="flex flex-row space-x-4 items-center">
              {!user.state ? (
                <>
                  <MdAccountCircle className="text-xl" />
                  <p className="text-lg">My Account</p>
                </>
              ) : (
                <>
                  <FiLogIn className="text-xl" />
                  <p
                    className="text-lg"
                    onClick={() => {
                      setOpen(false);
                      setModalOpen(true);
                    }}
                  >
                    Login
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </SwipeableDrawer>
    </>
  );
}
