import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { AiOutlineMenu } from "react-icons/ai";
import Toolbar from "@mui/material/Toolbar";
import Search from "./search";
import Drawer from "./drawer";
import Link from '../../common/Link'
import { BsCart2 } from "react-icons/bs";

export default function DrawerMobile({ setModalOpen }) {
  const [open, setOpen] = useState(false);
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
    <Toolbar className="w-full flex flex-col md:flex-row justify-center items-center md:justify-end xl:px-16 bg-slate-100">
      <div className="md:hidden flex flex-row w-full items-center justify-between my-3">
        <p>Test</p>
        <div className="flex flex-row items-center justify-center space-x-5">
          <Link href="/cart"><BsCart2 className="text-2xl" /></Link>
          <Search />
          <AiOutlineMenu className="text-2xl" onClick={toggleDrawer} />
        </div>
      </div>
      <Drawer
        open={open}
        setOpen={setOpen}
        toggleDrawer={toggleDrawer}
        setOpenLoginModal={setModalOpen}
      />
    </Toolbar>
  );
}
