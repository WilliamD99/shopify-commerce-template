import React, { useState } from "react";
import Link from "../common/Link";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import Loading from "../Loading/dataLoading";

export default function Footer() {
  const [isLoading, setLoading] = useState(false);

  const subscribeUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const axios = (await import("axios")).default;
    const field = document.querySelector("#subscribe-form");
    const data = await axios.post("/api/mailchimp/subscribe", {
      data: {
        email: field.value,
      },
    });
    if (data.data.status === 400) {
      let text = JSON.parse(data.data.response.text);
      toast.warning(text.detail);
    } else if (data.data.status === "subscribed") {
      toast.success("Succeed!");
    }
    setLoading(false);
  };

  return (
    <div id="footer" className="mt-5 xl:mt-10 shadow-inner">
      <div
        id="footer_top"
        className="w-screen bg-black px-5 py-10 xl:py-20 flex flex-col items-center justify-center space-y-5"
      >
        <p className="text-xl xl:text-2xl text-white">
          Subscribe to our newsletters
        </p>
        <form className="flex flex-col items-center space-y-5">
          <TextField
            id="subscribe-form"
            type="email"
            required
            label={
              <span className="text-sm xl:text-lg text-white">
                Enter your email
              </span>
            }
            className="w-72 xl:w-96 border-white"
          />
          <Button
            variant="outlined"
            className="w-32 xl:w-44 normal-case rounded-full text-white border-white bg-black hover:text-black hover:border-black hover:bg-white"
            type="submit"
            onClick={subscribeUser}
          >
            Sign Up {isLoading ? <Loading /> : ""}
          </Button>
          <p className="text-sm italic text-white">
            You may unsubscribe anytime
          </p>
        </form>
      </div>
      <div
        id="footer_bottom"
        className="w-full flex flex-col-reverse lg:flex-row justify-between items-center lg:px-10 py-3 bg-white"
      >
        <p className="text-black text-center">
          {" "}
          &copy; 2022 Ecommerce. All Rights Reserved
        </p>

        <div className="flex flex-row mb-2 lg:mb-0 justify-center space-x-5 lg:space-x-10 footer_links">
          <Link className="text-sm xl:text-base hover:underline" href="/terms">
            Term of Use
          </Link>
          <Link className="text-sm xl:text-base hover:underline" href="/policy">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
