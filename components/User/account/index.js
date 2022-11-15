import React, { useEffect, useContext, useRef, useState } from "react";
import userContext from "../../../utils/userContext";

import Login from "./login";
import Signup from "./signup";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Transition from "../../Animation/Mui-Transition-Slide";

export default function Index({ open, setOpen }) {
  const [index, setIndex] = useState(0);
  const { user } = useContext(userContext);

  // if successfully get customer, close the modal
  useEffect(() => {
    if (user) setOpen(false);
  }, [user]);

  return (
    <>
      <Dialog
        aria-labelledby="Login Modal"
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
        disableScrollLock={true}
      >
        <DialogContent>
          {index === 0 ? (
            <Login setIndex={setIndex} open={open} />
          ) : (
            <Signup setIndex={setIndex} />
          )}
        </DialogContent>
      </Dialog>{" "}
    </>
  );
}
