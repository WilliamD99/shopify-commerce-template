import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import userContext from "../../utils/userContext";
import { useRouter } from "next/router";

export default function LoginButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  let { setUser } = useContext(userContext);
  let router = useRouter();

  let currentlyHovering = false;

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleHover() {
    currentlyHovering = true;
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    setUser({ state: "none" });
    localStorage.removeItem("items");
    // deleteAccessToken.mutate({ accessToken: accessTokenExist() });
    setAnchorEl(null);
  };

  function handleCloseHover() {
    currentlyHovering = false;
    setTimeout(() => {
      if (!currentlyHovering) {
        handleClose();
      }
    }, 50);
  }

  return (
    <>
      <div className="relative">
        <Button
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={() => router.push("/my-account")}
          onMouseOver={handleClick}
          onMouseLeave={handleCloseHover}
          className="text-black font-medium normal-case text-sm"
        >
          My Account
        </Button>
        <Menu
          id="simple-menu"
          disableScrollLock={true}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{
            onMouseEnter: handleHover,
            onMouseLeave: handleCloseHover,
            style: { pointerEvents: "auto" },
          }}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          PopoverClasses={{
            root: "pointer-events-none",
          }}
        >
          <MenuItem onClick={handleClose}>Dashboard</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </>
  );
}
