import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { AiOutlineClose } from "react-icons/ai";

export default function Search() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (e, open) => {
    if ((e.type === "keydown" && e.key === "Tab") || e.key === "Shift") {
      return;
    }
    setOpen(open);
  };

  return (
    <>
      <FiSearch className="text-2xl" onClick={() => setOpen(true)} />
      <Drawer anchor="top" open={open} onClose={() => toggleDrawer(false)}>
        <Box className="w-screen h-screen py-5 px-5">
          <div>
            <p onClick={() => setOpen(false)}>Cancel</p>
          </div>
        </Box>
      </Drawer>
    </>
  );
}
