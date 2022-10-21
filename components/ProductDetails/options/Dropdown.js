import React, { useState, useContext } from "react";
import deviceContext from "../../../utils/deviceContext";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

export default function Dropdown({ options, handleFunc }) {
  let [select, setSelect] = useState([]);
  let { isMobile } = useContext(deviceContext);
  const handleSelection = (e, index) => {
    let newArr = select;
    newArr[index] = e.target.value;
    setSelect(newArr);
    handleFunc(index, e.target.value);
  };

  return (
    <>
      {options.map((option, index) => (
        <FormControl className="mt-2 xl:w-full" key={`dropdown-${index}`}>
          <TextField
            select
            value={select[index] ? select[index] : ""}
            label={<p className="text-xs md:text-base">{option.name}</p>}
            onChange={(e) => handleSelection(e, index)}
            SelectProps={{ MenuProps: { disableScrollLock: true } }}
            className="w-full"
            size={isMobile ? "small" : "medium"}
          >
            {option.values.map((variant, i) => (
              <MenuItem
                className="text-sm"
                value={variant}
                key={`variant-${i}`}
              >
                {variant}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      ))}
    </>
  );
}
