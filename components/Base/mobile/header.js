import React, { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";
import cartContext from "../../../utils/cartContext";
import { gsap } from "../../../utils/utils";

import { AiOutlineMenu } from "react-icons/ai";
import Toolbar from "@mui/material/Toolbar";
import Search from "./search";
import Drawer from "./drawer";
import Link from "../../common/Link";
import { BsCart2 } from "react-icons/bs";
import Badge from "@mui/material/Badge";

export default function DrawerMobile({ setModalOpen }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { cart } = useContext(cartContext);
  const [total, setTotal] = useState(0);
  const anim = useRef(null);

  const toggleDrawer = (e) => {
    if ((e.type === "keydown" && e.key === "Tab") || e.key === "Shift") {
      return;
    }
    setOpen(!open);
  };

  useEffect(() => {
    setOpen(false);
  }, [router.query]);

  useEffect(() => {
    let count = 0;
    if (typeof cart === "object") {
      cart.forEach((item) => (count += item.quantity));
      setTotal(count);
    }
  }, [cart]);

  useEffect(() => {
    anim.current = gsap.fromTo(
      "#cart-badge .MuiBadge-badge",
      {
        autoAlpha: 0,
        top: "-0.1rem",
      },
      {
        autoAlpha: 1,
        top: "0rem",
      }
    );
  }, [total]);

  return (
    <Toolbar className="w-full flex flex-col md:flex-row justify-center items-center md:justify-end xl:px-16 bg-slate-100">
      <div className="md:hidden flex flex-row w-full items-center justify-between my-3">
        <Link href="/">Test</Link>
        <div className="flex flex-row items-center justify-center space-x-5">
          <Link href="/cart">
            <Badge
              badgeContent={total}
              id="cart-badge"
              className="text-black font-semibold"
            >
              <BsCart2 className="text-2xl" />
            </Badge>
          </Link>
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
