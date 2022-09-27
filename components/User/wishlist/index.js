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
      <div onClick={() => console.log(list)}>Wishlist</div>;
      {list.map((e, i) => (
        <WishlistItem key={i} id={e} />
      ))}
    </>
  );
}
