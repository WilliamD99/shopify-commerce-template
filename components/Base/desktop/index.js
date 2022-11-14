import React from "react";
import Toolbar from "@mui/material/Toolbar";
import HeaderDesktop from "./header";
import HeaderBottom from "./headerBottom";

export default function HeaderDesktopIndex({ setModalOpen }) {
  return (
    <>
      <Toolbar
        variant="dense"
        className="w-full flex flex-col md:flex-row justify-center items-center md:justify-end xl:px-16 bg-slate-50"
      >
        <HeaderDesktop setModalOpen={setModalOpen} />
      </Toolbar>
      <HeaderBottom />
    </>
  );
}
