import React from "react";
import Footer from "./Base/footer";
import Header from "./Base/header";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      {/* <Header /> */}
      <div className="mt-24">{children}</div>
      {/* <Footer /> */}
    </div>
  );
}
