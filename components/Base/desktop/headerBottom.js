import React, { useEffect, useContext, useRef, useState } from "react";
import userContext from "../../../utils/userContext";
import { gsap } from "../../../utils/utils";

import Link from "../../common/Link";
import Image from '../../common/Image'
import Search from "./search";
import Navigation from "./navigation";
import Cart from "../cart";
import Badge from "@mui/material/Badge";
import { AiOutlineHeart } from "react-icons/ai";

export default function HeaderBottom() {
  let { user } = useContext(userContext);
  let [wlCount, setWlCount] = useState(0);
  let wlRef = useRef(gsap.timeline({}));

  //   Wishlish animation
  useEffect(() => {
    if (user.id) {
      wlRef.current
        .to("#wlBadge", { scale: 1.2, duration: 0.3 })
        .to("#wlBadge", { scale: 1, duration: 0.3 });
      setWlCount(
        JSON.parse(
          user.metafields[
            user.metafields.findIndex((e) => e.key === "wishlist")
          ].value
        ).length
      );
    }
    return () => wlRef.current.kill();
  }, [user]);
  return (
    <>
      <div className="relative flex flex-row justify-between items-center py-4 px-16 bg-white">
        {/* <div className="h-24 w-24 z-50 invisible">
        </div> */}
        {/* <div className="absolute top-1/2 -translate-y-1/2 h-24 w-24 z-50 bg-white rounded-full overflow-visible">
          <Image src="/images/addiction.png" layout="fill" objectFit="cover" />
        </div> */}
        <Link className="text-lg text-white " href="/">
          Ecommerce Template
        </Link>

        <Navigation />

        <div className="flex flex-row space-x-5 items-center">
          <Search />
          {/* Wishlish Button */}
          {!user?.state ? (
            <Link href="/my-account">
              <Badge id="wlBadge" badgeContent={wlCount}>
                <AiOutlineHeart className="text-2xl text-white" />
              </Badge>
            </Link>
          ) : (
            <></>
          )}
          <Cart />
        </div>
      </div>{" "}
    </>
  );
}
