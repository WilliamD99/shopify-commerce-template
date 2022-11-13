import React, { useEffect, useContext, useCallback, useState } from "react";
import { toast } from "react-toastify";
import useCustomerGetAccessToken from "../../../utils/hooks/useCustomerGetAccessToken";
import { encryptText, setCookie } from "../../../utils/utils";
import useCustomerGet from "../../../utils/hooks/useCustomerGet";
import userContext from "../../../utils/userContext";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Loading from "../../Loading/dataLoading";
import Divider from "@mui/material/Divider";
import Link from "../../common/Link";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { FormControl } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";

export default function Login({ setIndex }) {
  const { setUser } = useContext(userContext);
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  let getAccessToken = useCustomerGetAccessToken();
  let customer = useCustomerGet();

  const handleLogin = useCallback((e) => {
    e.preventDefault();
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    getAccessToken.mutate({ email: email.value, password: password.value });
  }, []);

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

  // get access token after handleLogin run
  useEffect(() => {
    if (getAccessToken.data !== undefined && !getAccessToken.isError) {
      let token =
        getAccessToken.data?.customerAccessTokenCreate.customerAccessToken;
      if (token) {
        customer.mutate({ accessToken: token.accessToken });
        setCookie("tn", JSON.stringify(token.accessToken), 30);
      } else {
        let error =
          getAccessToken.data.customerAccessTokenCreate.customerUserErrors[0]
            .message;
        toast.error(error);
      }
    }
  }, [getAccessToken.isLoading]);

  // after got the access token, get the customer
  useEffect(() => {
    if (customer.data && !customer.isError) {
      setUser(customer.data.customer);
    }
  }, [customer.isLoading]);

  return (
    <>
      <form
        id="loginForm"
        className="absolute w-80 md:w-96 h-96 md:h-112 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-10 py-5 md:py-8 flex flex-col justify-between space-y-3 bg-slate-200 rounded-xl z-50"
        onSubmit={handleLogin}
      >
        <p className="text-black text-xl md:text-2xl mb-3 md:mb-5 font-bold text-center">
          Login
        </p>
        <div className="flex flex-col space-y-5">
          <TextField
            className="rounded-md"
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
          <div className="flex flex-row justify-between">
            <Link href="#" className="text-sm">
              Forgot password?
            </Link>
          </div>
          <Button
            variant="outlined"
            className="h-10 normal-case bg-black border-none shadow-2xl text-white font-semibold rounded-md  hover:text-black hover:bg-white hover:border-none"
            onClick={handleLogin}
            type="submit"
          >
            {getAccessToken.isLoading ? <Loading /> : "Login"}
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
          onClick={() => setIndex(1)}
        >
          Sign Up
        </Button>
      </form>{" "}
    </>
  );
}
