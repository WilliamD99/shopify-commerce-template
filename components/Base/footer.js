import React from "react";
import Link from "../common/Link";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Footer() {
  return (
    <div id="footer" className="mt-10 shadow-inner">
      <div
        id="footer_top"
        className="w-screen bg-slate-100 px-5 py-20 flex flex-col items-center justify-center space-y-5"
      >
        <p className="text-2xl ">Subscribe to our newsletters</p>
        <div className="flex flex-col items-center space-y-5">
          <TextField label="Enter your email" className="w-96" />
          <Button
            variant="outlined"
            className="w-44 normal-case text-black border-black hover:text-white hover:border-white hover:bg-black"
          >
            Sign Up
          </Button>
        </div>
      </div>
      <div
        id="footer_bottom"
        className="w-full flex flex-col space-y-5 px-5 pt-8 pb-3 bg-white"
      >
        <div className="flex flex-row justify-center space-x-10 footer_links">
          <Link className="text-lg font-semibold footer-link" href="/contact">
            Contact
          </Link>
          <Link className="text-lg font-semibold footer-link" href="/faq">
            FAQ
          </Link>
          <Link className="text-lg font-semibold footer-link" href="/terms">
            Term of Use
          </Link>
          <Link className="text-lg font-semibold footer-link" href="/policy">
            Privacy Policy
          </Link>
        </div>
        <p className="text-black text-center"> &copy; 2022 Ecommerce.</p>
      </div>
    </div>
  );
}
