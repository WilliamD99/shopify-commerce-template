import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

export default function Dropdown({ options, handleFunc }) {
  let [select, setSelect] = useState([]);
  const handleSelection = (e, index) => {
    let newArr = select;
    newArr[index] = e.target.value;
    setSelect(newArr);
    handleFunc(index, e.target.value);
  };

  return (
    <>
      {options.map((option, index) => (
        <FormControl className="mt-2 xl:w-96" key={`dropdown-${index}`}>
          <TextField
            select
            value={select[index] ? select[index] : ""}
            label={option.name}
            onChange={(e) => handleSelection(e, index)}
            SelectProps={{ MenuProps: { disableScrollLock: true } }}
          >
            {option.values.map((variant, i) => (
              <MenuItem value={variant} key={`variant-${i}`}>
                {variant}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      ))}
    </>
  );
}
