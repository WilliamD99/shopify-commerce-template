import React, { useState } from "react";
import { useRouter } from "next/router";

import Button from "@mui/material/Button";
import FilterCheckbox from "./filterCheckbox";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Limit from "./filter/limit";

export default function Filter({
  length,
  isLoading,
  count,
  total,
  setSortKey,
  setReverse,
  // setPath,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const router = useRouter();
  const routerQuery = router.query;

  // Handle sorting router
  const handleSortingClick = async (key, reverse) => {
    routerQuery.sort_key = key;
    routerQuery.reverse = reverse.toString();
    delete routerQuery['cursor']
    delete routerQuery['direction']
    delete routerQuery['reversed']

    router.push(
      {
        query: routerQuery,
      },
      undefined
    );

    await setSortKey(key);
    await setReverse(reverse);
  };

  let handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <>
      <div
        id="filter-bar"
        className="filter-menu hidden md:flex flex-row justify-end bg-white py-6 z-40 -mb-8"
      >
        <div className="flex flex-row space-x-5 items-center">
          <FilterCheckbox />

          <div id="sort" className="relative">
            <Button
              className="text-black text-lg normal-case"
              id="sort-button"
              aria-controls={open ? "sort-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleMenuClick}
            >
              Sort by
            </Button>
            <Menu
              disableScrollLock={true}
              id="sort-menu"
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              open={open}
              MenuListProps={{
                "aria-labelledby": "sort-button",
              }}
            >
              <MenuItem onClick={() => handleSortingClick("TITLE", false)}>
                Title (A-Z)
              </MenuItem>
              <MenuItem onClick={() => handleSortingClick("TITLE", true)}>
                Title (Z-A)
              </MenuItem>
              <MenuItem onClick={() => handleSortingClick("PRICE", true)}>
                Price (High-Low)
              </MenuItem>
              <MenuItem onClick={() => handleSortingClick("PRICE", false)}>
                Price (Low-High)
              </MenuItem>
              <MenuItem onClick={() => handleSortingClick("CREATED_AT", false)}>
                Latest Arrival
              </MenuItem>
            </Menu>
          </div>
          <Limit />
        </div>
      </div>
    </>
  );
}