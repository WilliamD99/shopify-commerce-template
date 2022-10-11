import React, { useContext, useEffect, useState } from "react";
import userContext from "../../../utils/userContext";

import WishlistItem from "./wishlistItem";

export default function Wishlist() {
  let [list, setList] = useState([]);
  let { user } = useContext(userContext);

  useEffect(() => {
    if (user) {
      setList(JSON.parse(user.metafields[0].value));
      console.log(user);
    }
  }, [user]);

  return (
    <>
      <p className="text-2xl font-bold mb-10">Wishlist</p>
      <div className="grid grid-cols-4">
        {list.map((e, i) => (
          <WishlistItem key={i} id={e} />
        ))}
      </div>
    </>
  );
}
