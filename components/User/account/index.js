import React, { useEffect, useContext, useRef, useState } from "react";
import userContext from "../../../utils/userContext";

import Modal from "@mui/material/Modal";
import Login from "./login";
import Signup from "./signup";

export default function Index({ open, setOpen }) {
  const [index, setIndex] = useState(0);
  const { user } = useContext(userContext);

  // if successfully get customer, close the modal
  useEffect(() => {
    if (user) setOpen(false);
  }, [user]);

  return (
    <>
      <Modal
        aria-labelledby="Login Modal"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div>
          {index === 0 ? (
            <Login setIndex={setIndex} />
          ) : (
            <Signup setIndex={setIndex} />
          )}
        </div>
      </Modal>{" "}
    </>
  );
}
