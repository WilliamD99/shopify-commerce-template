import React, { useContext, useEffect, useState } from "react";
import loginContext from "../../../utils/loginContext";
import userContext from "../../../utils/userContext";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Link from "../../common/Link";
import Divider from "@mui/material/Divider";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";

import useCustomerDeleteAccessToken from "../../../utils/hooks/useCustomerDeleteAccessToken";
import Logout from "../../User/account/logout";

export default function Drawer({ open, setOpen, toggleDrawer }) {
  const { user } = useContext(userContext);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { setUserModalShow } = useContext(loginContext);
  const deleteAccessToken = useCustomerDeleteAccessToken();

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  useEffect(() => {
    if (deleteAccessToken.isLoading) console.log("loading...");
    else if (deleteAccessToken.data?.data.customerAccessTokenDelete) {
      setOpen(false);
    }
  }, [deleteAccessToken.data]);

  useEffect(() => {
    setLogoutDialogOpen(false);
  }, []);

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
              <div className="text-xl font-medium" href="/shop">
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
              <div className="text-xl font-medium" href="/shop/price-drop">
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
              <div className="text-xl font-medium" href="/shop/newest-release">
                New Release
              </div>
              <MdOutlineArrowForwardIos className="text-xl" />
            </Link>
          </div>
          <Divider className="opacity-80 " />

          {user?.id ? (
            <>
              <div className="pl-8 pr-5">
                <div className="flex flex-row space-x-4 justify-between items-center">
                  <div onClick={handleLogout} className="text-xl font-medium">
                    Logout
                  </div>
                </div>
              </div>
              <Divider className="opacity-80 " />
            </>
          ) : (
            <>
              <div className="pl-8 pr-5">
                <div className="flex flex-row space-x-4 justify-between items-center">
                  <div
                    onClick={() => {
                      setOpen(false);
                      setUserModalShow(true);
                    }}
                    className="text-xl font-medium"
                  >
                    Sign in
                  </div>
                </div>
              </div>
              <Divider className="opacity-80 " />
            </>
          )}
        </div>
      </SwipeableDrawer>
      {logoutDialogOpen ? (
        <Logout
          redirect={false}
          open={logoutDialogOpen}
          setOpen={setLogoutDialogOpen}
        />
      ) : (
        <></>
      )}
    </>
  );
}
