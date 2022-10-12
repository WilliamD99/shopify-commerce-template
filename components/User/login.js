import React, { useEffect, useContext, useCallback, useState } from "react";
import useCustomerGetAccessToken from "../../utils/hooks/useCustomerGetAccessToken";
import { encryptText } from "../../utils/utils";
import useCustomerGet from "../../utils/hooks/useCustomerGet";
import userContext from "../../utils/userContext";
import { toast } from "react-toastify";

import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Loading from "../Loading/dataLoading";
import Divider from "@mui/material/Divider";
import Link from "../common/Link";

export default function Login({ open, setOpen }) {
  const { user, setUser } = useContext(userContext);

  let getAccessToken = useCustomerGetAccessToken();
  let customer = useCustomerGet();

  const handleLogin = useCallback((e) => {
    e.preventDefault();
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    getAccessToken.mutate({ email: email.value, password: password.value });
  }, []);

  // get access token after handleLogin run
  useEffect(() => {
    if (getAccessToken.data !== undefined && !getAccessToken.isError) {
      let token =
        getAccessToken.data.customerAccessTokenCreate.customerAccessToken;
      if (token) {
        customer.mutate({ accessToken: token.accessToken });
        localStorage.setItem(
          "tn",
          JSON.stringify({
            value: encryptText(token.accessToken),
            expiresAt: "",
          })
        );
        // document.cookie = `token=${encryptText(token.accessToken)};expires=${
        //   token.expiresAt
        // }`;
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

  // if successfully get customer, close the modal
  useEffect(() => {
    if (user) setOpen(false);
  }, [user]);

  return (
    <>
      <Modal
        aria-labelledby="Login Modal"
        open={open}
        onClose={() => setOpen(false)}
      >
        <form
          id="loginForm"
          className="absolute w-96 h-112 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-5 flex flex-col justify-between space-y-3 bg-slate-200 rounded-xl z-50"
          onSubmit={handleLogin}
        >
          <p className="text-black text-3xl font-bold text-center">Login</p>
          <div className="flex flex-col space-y-5">
            <TextField
              className="rounded-md"
              label="Email"
              type="email"
              id="email"
              required
            />
            <TextField
              className="rounded-md"
              label="Password"
              type="password"
              id="password"
              required
            />
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
          >
            Sign Up
          </Button>
        </form>
      </Modal>
    </>
  );
}
