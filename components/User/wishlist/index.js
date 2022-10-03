import React, { useContext, useEffect, useState } from "react";
import userContext from "../../../utils/userContext";

import WishlistItem from "./wishlistItem";

export default function Wishlist() {
  let [list, setList] = useState([]);
  let { user } = useContext(userContext);

  useEffect(() => {
    if (user) {
      setList(JSON.parse(user.metafields[0].value));
    }
  }, [user]);

  return (
    <>
      <p className="text-2xl font-bold mb-10" onClick={() => console.log(list)}>
        Wishlist
      </p>

      {list.map((e, i) => (
        <WishlistItem key={i} id={e} />
      ))}
    </>
  );
}
