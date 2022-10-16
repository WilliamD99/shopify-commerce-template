import React, { useEffect, useState } from "react";
import { getCookie, setCookie } from "../../utils/utils";

import Image from "../common/Image";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import Link from "../common/Link";

import { toast } from "react-toastify";

const handleVerifyAge = (date) => {
  let today = new Date();

  if (
    today.getFullYear() - date.$y < 19 ||
    (today.getFullYear() - date.$y === 19 && today.getMonth() > date.$M) ||
    (today.getFullYear() - date.$y === 19 &&
      today.getMonth() === date.$M &&
      today.getDate() > date.$D)
  ) {
    toast.warning("Sorry, you're not old enough to enter!");
    return false;
  } else {
    setCookie("age-gate-verify", true, 30);
    return true;
  }
};

export default function AgeGate() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();

  useEffect(() => {
    let ageGateVerify = getCookie("age-gate-verify");
    setTimeout(() => {
      if (JSON.parse(ageGateVerify)) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    }, 1000);
  }, []);

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="relative w-screen h-screen backdrop-blur-md">
          <div className="w-1/2 h-1/2 bg-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md flex flex-row">
            <div className="h-full w-1/2 relative">
              <Image
                src="https://cdn.shopify.com/s/files/1/0548/9652/5492/files/age-gate.webp?v=1665696424"
                layout="fill"
              />
            </div>
            <div className="w-1/2 h-full px-8 py-8 relative flex flex-col justify-between space-y-5">
              <div className="flex flex-col justify-center items-center">
                <p className="text-xl font-semibold">Hello there,</p>
                <p className="text-xl font-semibold">
                  Care to show us some ID?
                </p>
              </div>
              <div className="flex flex-col space-y-5">
                <p>Please enter your date of birth:</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="w-full"
                    renderInput={(props) => <TextField {...props} />}
                    label="Birthday"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                  />
                </LocalizationProvider>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Button
                  className="h-10 w-full normal-case text-lg text-black bg-white border-black hover:text-white hover:bg-black hover:border-white"
                  variant="outlined"
                  disabled={value ? false : true}
                  onClick={() => {
                    let verify = handleVerifyAge(value);
                    setTimeout(() => {
                      if (verify) setOpen(false);
                    }, 500);
                  }}
                >
                  Verify
                </Button>
                <p className="text-xs text-center">
                  By entering this site, you are agreeing to our{" "}
                  <Link href="#" className="font-medium hover:underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="font-medium hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
