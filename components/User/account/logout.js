import React, { useState, useEffect, useContext } from "react";
import userContext from "../../../utils/userContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { setCookie } from "../../../utils/utils";

export default function Logout({ redirect, open, setOpen }) {
  const router = useRouter();
  const { setUser } = useContext(userContext);

  const handleClose = () => {
    setOpen(false);
    if (redirect) {
      router.push("/my-account");
    }
  };

  const handleLogout = () => {
    setUser({ state: "none" });
    setCookie("tn", "");
    router.push("/");
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to logout?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Logging will clear out all your items in your cart, as well as
            disable checkout.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="normal-case text-black" onClick={handleClose}>
            Disagree
          </Button>
          <Button
            className="normal-case text-black"
            onClick={handleLogout}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
