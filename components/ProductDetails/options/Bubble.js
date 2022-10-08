import React from 'react'
import Chip from "@mui/material/Chip"

export default function Bubble({ options, handleFunc }) {

  let handleClick = (index, value) => {
    let element = document.querySelector(`#${value}-${index}`);
    let others = document.querySelectorAll(`.options.options-${index}`);
    for (let other of others) {
      other.classList.remove("selected");
    }
    element.classList.add("selected");
    handleFunc(index, value)
  }

  return (
    <>
        {options.map((e, i) => (
            <div key={`variant-${i}`} className="flex flex-col space-y-2">
            <p className="font-semibold text-xl">{e.name}:</p>
            <div className="flex flex-row space-x-2">
                {e.values.map((value, index) => (
                <Chip
                    id={value + "-" + i}
                    size="medium"
                    key={`value-${index}`}
                    className={`py-2 px-2 options options-${i}`}
                    label={<p className="text-lg">{value}</p>}
                    onClick={() => handleClick(i, value)}
                />
                ))}
            </div>
            </div>
        ))}    
    </>
  )
}
