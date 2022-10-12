import React, { useState, useCallback } from "react";
import { useRouter } from "next/router";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function Limit() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [defaultLimit, setDefaultLimit] = useState(12);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const routerQuery = router.query;

  const handleMenuClick = useCallback((e) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handleItemClick = (limit) => {
    setDefaultLimit(limit);
    routerQuery.limit = limit;
    router.push({ query: routerQuery }, undefined);
  };

  return (
    <>
      <div id="limit" className="relative">
        <Button
          className="text-black text-lg normal-case"
          id="limit-button"
          aria-controls={open ? "limit-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleMenuClick}
        >
          Limit:
          <span className="ml-2">{defaultLimit}</span>
        </Button>
        <Menu
          disableScrollLock={true}
          id="limit-menu"
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          open={open}
          MenuListProps={{
            "aria-labelledby": "limit-button",
          }}
        >
          <MenuItem
            disabled={defaultLimit === 12}
            onClick={() => handleItemClick(12)}
          >
            12 products
          </MenuItem>
          <MenuItem
            disabled={defaultLimit === 18}
            onClick={() => handleItemClick(18)}
          >
            18 products
          </MenuItem>
          <MenuItem
            disabled={defaultLimit === 24}
            onClick={() => handleItemClick(24)}
          >
            24 products
          </MenuItem>
        </Menu>
      </div>{" "}
    </>
  );
}
