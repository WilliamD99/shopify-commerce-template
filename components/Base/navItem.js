import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "../common/Link";

export default function BasicMenu({ name, items, link, href }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {!link ? (
        <>
          <Button
            id={name}
            aria-controls={open ? `${name}-menu` : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className="text-black font-medium normal-case text-lg"
          >
            {name}
          </Button>

          <Menu
            disableScrollLock={true}
            id={`${name}-menu`}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": { name },
            }}
            classes={{ list: "nav-menu py-2 px-2" }}
            className="w-96 nav-wrapper__menu"
          >
            {items.length > 0 ? (
              items.map((item, index) => (
                <MenuItem key={`${item}-${index}`} onClick={handleClose}>
                  <Link href="#">{item.node}</Link>
                </MenuItem>
              ))
            ) : (
              <div></div>
            )}
          </Menu>
        </>
      ) : (
        <Link className="text-black text-lg font-medium" href={href}>
          {name}
        </Link>
      )}
    </div>
  );
}
