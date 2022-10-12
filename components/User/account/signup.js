import React, { useState, useCallback, useEffect } from "react";
import useCustomerCreate from "../../../utils/hooks/useCustomerCreate";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Loading from "../../Loading/dataLoading";
import Divider from "@mui/material/Divider";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";

import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { FormControl } from "@mui/material";
import { toast } from "react-toastify";

export default function Signup({ setIndex }) {
  const [values, setValues] = useState({
    password: "",
    confirm: "",
    showPassword: false,
  });
  let customerCreate = useCustomerCreate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let emailInput = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let confirmPassword = document.querySelector("#confirm-password").value;

    if (emailInput === "" || password === "" || confirmPassword === "") {
      toast.error("Please fill out all the fields");
    } else {
      if (password !== confirmPassword) {
        toast.error("Password doesn't match");
      } else {
        customerCreate.mutate({
          email: emailInput,
          password: password,
        });
      }
    }
  };

  useEffect(() => {
    if (customerCreate.isSuccess && customerCreate.data) {
      toast.success("Successfully create an account!");
      document.querySelector("#email").value = "";
      document.querySelector("#password").value = "";
      document.querySelector("#confirm-password").value = "";
      setValues({ ...values, ["password"]: "" });
    } else if (
      !customerCreate.isIdle &&
      customerCreate.isSuccess &&
      !customerCreate.data
    ) {
      toast.error("Something went wrong, please try again");
    }
    console.log(customerCreate);
  }, [customerCreate.isLoading]);

  return (
    <>
      <form
        id="loginForm"
        className="absolute w-96 h-112 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-10 py-8 flex flex-col justify-between space-y-3 bg-slate-200 rounded-xl z-50"
        onSubmit={handleSubmit}
      >
        {customerCreate.isLoading ? <Loading /> : ""}

        <p className="text-black text-2xl mb-5 font-bold text-center">
          Sign Up
        </p>
        <div className="flex flex-col space-y-5">
          <TextField
            className="rounded-md text-sm"
            label={<span className="text-sm">Email</span>}
            type="email"
            id="email"
            required
            size="small"
          />

          <FormControl required size="small" variant="outlined">
            <InputLabel
              className="text-sm "
              htmlFor="outlined-adornment-password"
            >
              Password
            </InputLabel>
            <OutlinedInput
              id="password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              size="small"
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? (
                      <MdVisibilityOff />
                    ) : (
                      <MdVisibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <FormControl required size="small" variant="outlined">
            <InputLabel
              className="text-sm "
              htmlFor="outlined-adornment-password"
            >
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="confirm-password"
              type={values.showPassword ? "text" : "password"}
              value={values.confirm}
              size="small"
              onChange={handleChange("confirm")}
              label="Confirm Password"
            />
          </FormControl>

          <Button
            variant="outlined"
            className="h-10 normal-case bg-black border-none shadow-2xl text-white font-semibold rounded-md  hover:text-black hover:bg-white hover:border-none"
            onClick={handleSubmit}
            type="submit"
          >
            Sign Up
          </Button>
        </div>
        <div className="flex flex-row justify-center items-center space-x-5">
          <Divider className="w-1/3" />
          <p>Or</p>
          <Divider className="w-1/3" />
        </div>
        <Button
          variant="outlined"
          className="h-10 normal-case bg-white border-none text-black font-semibold rounded-md shadow-2xl hover:text-white hover:bg-black hover:border-none"
          onClick={() => setIndex(0)}
        >
          Login
        </Button>
      </form>{" "}
    </>
  );
}
