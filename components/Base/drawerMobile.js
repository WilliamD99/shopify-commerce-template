import React, { useState, useContext } from "react";
import userContext from "../../utils/userContext";

import { AiOutlineMenu, AiFillShop } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { FaQuestion } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Cart from "./cart";
import Divider from "@mui/material/Divider";
import Link from "../common/Link";

export default function DrawerMobile() {
  const [open, setOpen] = useState(false);
  const { user } = useContext(userContext);

  const toggleDrawer = (e) => {
    if ((e.type === "keydown" && e.key === "Tab") || e.key === "Shift") {
      return;
    }
    setOpen(!open);
  };

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
              <Link className="text-lg" href="#">
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
              {user ? (
                <></>
              ) : (
                <>
                  <FiLogIn className="text-xl" />
                  <p className="text-lg">Login</p>
                </>
              )}
            </div>
          </div>
        </div>
      </SwipeableDrawer>
    </>
  );
}
