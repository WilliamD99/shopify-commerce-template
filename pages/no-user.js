import React, { useState } from "react";
import LoginModal from '../components/User/login'

export default function Err() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col justify-center items-center lg:mt-32">
        <p className="font-bold text-xl" onClick={() => setOpen(true)}>Please Login first</p>
      </div>
      <LoginModal open={open} setOpen={setOpen} />
    </>
  );
}
