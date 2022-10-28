import React, { useContext } from "react";
import userContext from "../../../utils/userContext";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Link from "../../common/Link";
import Divider from "@mui/material/Divider";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";

export default function Drawer({
  open,
  setOpen,
  toggleDrawer,
  setOpenLoginModal,
}) {
  const { user } = useContext(userContext);

  return (
    <>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onOpen={toggleDrawer}
        onClose={toggleDrawer}
      >
        <div className="w-80 pt-5 flex flex-col space-y-3">
          <div className="flex justify-end pr-5 mb-3">
            <AiOutlineClose
              onClick={toggleDrawer}
              className="text-xl text-right"
            />
          </div>

          <div className="pl-8 pr-5">
            <Link
              href="/shop"
              className="flex flex-row space-x-4 justify-between items-center"
            >
              <div className="text-2xl font-medium" href="/shop">
                Shop
              </div>
              <MdOutlineArrowForwardIos className="text-xl" />
            </Link>
          </div>
          <Divider className="opacity-80 " />

          <div className="pl-8 pr-5">
            <Link
              href="/shop"
              className="flex flex-row space-x-4 justify-between items-center"
            >
              <div className="text-2xl font-medium" href="/shop">
                Price Drops
              </div>
              <MdOutlineArrowForwardIos className="text-xl" />
            </Link>
          </div>
          <Divider className="opacity-80 " />

          <div className="pl-8 pr-5">
            <Link
              href="/shop"
              className="flex flex-row space-x-4 justify-between items-center"
            >
              <div className="text-2xl font-medium" href="/shop">
                New Release
              </div>
              <MdOutlineArrowForwardIos className="text-xl" />
            </Link>
          </div>
          <Divider className="opacity-80 " />
        </div>
      </SwipeableDrawer>
    </>
  );
}
