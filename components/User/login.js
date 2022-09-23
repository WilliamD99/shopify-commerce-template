import React, { useEffect, useContext, useCallback, useState } from "react";
import useCustomerGetAccessToken from "../../utils/hooks/useCustomerGetAccessToken";
import { encryptText } from "../../utils/utils";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import useCustomerGet from "../../utils/hooks/useCustomerGet";
import userContext from "../../utils/userContext";
import { gsap } from "../../utils/utils";

export default function Login({ open, setOpen }) {
  const { user, setUser } = useContext(userContext);
  const [error, setError] = useState("");

  let getAccessToken = useCustomerGetAccessToken();
  let customer = useCustomerGet();

  const handleErrMsg = (e) => {
    setError(e);
    setTimeout(() => {
      setError("");
    }, [2000]);
  };

  const handleLogin = useCallback(() => {
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
        document.cookie = `token=${encryptText(token.accessToken)};expires=${
          token.expiresAt
        }`;
      } else {
        let error =
          getAccessToken.data.customerAccessTokenCreate.customerUserErrors[0]
            .message;
        console.log(error);
        handleErrMsg(error);
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
        <div
          id="loginForm"
          className="absolute w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-8 flex flex-col justify-between space-y-5 bg-slate-200 rounded-xl z-50"
        >
          <p className="text-black text-3xl font-bold text-center">Login</p>
          <div className="flex flex-col space-y-5">
            <TextField
              className="rounded-md"
              label="Email"
              type="email"
              id="email"
            />
            <TextField
              className="rounded-md"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              variant="outlined"
              className="text-black rounded-md"
              onClick={handleLogin}
            >
              {getAccessToken.isLoading ? "Loading" : "Login"}
            </Button>
            <p>{error}</p>
          </div>
          <div className="flex flex-row space-x-2 justify-center items-center">
            <p className="text-sm">Don&apos;t have an account yet?</p>
            <button className="font-semibold text-sm hover:underline">
              Sign up
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
