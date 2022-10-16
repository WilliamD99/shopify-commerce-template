import React from "react";
import Footer from "./Base/footer";
import Header from "./Base/header";

import { ToastContainer } from "react-toastify";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <div className=" min-h-screen">{children}</div>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick
        theme="dark"
      />
    </div>
  );
}
