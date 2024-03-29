import React, { useEffect } from "react";
import { useRouter } from "next/router";

import NavItem from "./navItem";
import useVendorGet from "../../../utils/hooks/useVendorGet";
import Link from "../../common/Link";

function Navigation() {
  const router = useRouter();
  let getVendor = useVendorGet();

  useEffect(() => {
    getVendor.mutate();
  }, []);

  return (
    <>
      <div className="flex flex-row items-center space-x-10">
        <Link href="/shop" className={`text-lg text-white`}>
          Shop
        </Link>
        <Link href="/shop" className={`text-lg text-white`}>
          New Release
        </Link>
        <Link href="/shop" className={`text-lg text-white`}>
          Price Drop
        </Link>
        {/* <NavItem
          name="Vendor"
          link={false}
          items={getVendor.data ? getVendor.data.shop.productVendors.edges : []}
        /> */}
        {/* <NavItem name="Best Seller" link={false} items={["test", "test"]} />
        <NavItem name="New Arrival" link={false} items={["test", "test"]} />
        {/* <NavItem name="Product Type" link={false} items={["test", "test"]} /> */}
        {/* <NavItem name="FAQ" link={true} href="/faq" items={["test", "test"]} />{" "} */}
      </div>
    </>
  );
}

export default Navigation;
