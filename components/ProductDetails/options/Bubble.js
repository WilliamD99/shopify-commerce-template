import React from "react";
import Chip from "@mui/material/Chip";

import stc from "string-to-color";

export default function Bubble({ options, handleFunc }) {
  let handleClick = (index, value, name) => {
    let element = document.querySelector(`#${value}-${index}`);
    let others = document.querySelectorAll(`.options.options-${index}`);
    if (name.toUpperCase() !== "COLOR") {
      for (let other of others) {
        other.classList.remove("selected");
      }
      element.classList.add("selected");
    } else {
      let selectedText = document.querySelector(".selected-color");
      selectedText.innerHTML = value;
      for (let other of others) {
        other.classList.remove("color-selected");
      }
      element.classList.add("color-selected");
    }
    handleFunc(index, value);
  };

  let colorChip = (value, index, i, name) => (
    <Chip
      id={value + "-" + i}
      size="medium"
      key={`value-${index}`}
      className={`py-2 px-2 options options-${i}`}
      style={{ backgroundColor: stc(value) }}
      onClick={() => handleClick(i, value, name)}
    />
  );

  return (
    <>
      {options.map((e, i) => (
        <div key={`variant-${i}`} className="flex flex-col space-y-2">
          <p className="font-semibold text-xl">
            {e.name}:
            {e.name.toUpperCase() === "COLOR" ? (
              <span className="selected-color text-lg ml-2"></span>
            ) : (
              <></>
            )}
          </p>
          <div className="flex flex-row flex-wrap space-x-2">
            {e.values.map((value, index) => {
              if (e.name.toUpperCase() !== "COLOR")
                return (
                  <Chip
                    id={value + "-" + i}
                    size="medium"
                    key={`value-${index}`}
                    className={`py-2 px-2 mb-2 options options-${i}`}
                    label={<p className="text-lg">{value}</p>}
                    onClick={() => handleClick(i, value, e.name)}
                  />
                );
              else return colorChip(value, index, i, e.name);
            })}
          </div>
        </div>
      ))}
    </>
  );
}
