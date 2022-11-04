import React, { useState, useContext } from "react";
import dynamic from "next/dynamic";
import userContext from "../../../utils/userContext";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Loading from "../../../components/Loading/dataLoading";
import Dashboard from "../../../components/User/dashboard";

// Dynamic component
const Wishlist = dynamic(() => import("../../../components/User/wishlist"), {
  loading: () => <p>Loading ...</p>,
});
const ShippingForm = dynamic(
  () => import("../../../components/User/shipping-update"),
  { loading: () => <p>Loading...</p> }
);
const UpdateForm = dynamic(() => import("../../../components/User/user-update"), {
  loading: () => <p>Loading...</p>,
});
const Loyalty = dynamic(() => import("../../../components/User/loyalty"), {
  loading: () => <p>Loading ...</p>,
});
import { NextSeo } from "next-seo";

export default function Account() {
  const { user } = useContext(userContext);
  const [tab, setTab] = useState(0);

  const handleChangeTab = (e, newValue) => {
    setTab(newValue);
  };

  // Maybe deleted due to redirect by middleware
  if (user?.state === "loading") return <Loading />;
  if (user?.state === "none") return <p>Please Sign In first</p>;

  if (!user)
    return (
      <>
        <p className="text-center text-xl mt-44">You&apos;re not login yet!</p>
      </>
    );

  return (
    <>
      <NextSeo title="My Account" description="" />
      <div className="flex flex-col ml-20 mt-10">
        <Tabs className="mb-12" value={tab} onChange={handleChangeTab}>
          <Tab label="Dashboard" />
          <Tab label="Personal Info" />
          <Tab label="Shipping" />
          <Tab label="Payment" />
          <Tab label="History" />
          <Tab label="Wishlist" />
          <Tab label="Loyalty Program" />
        </Tabs>

        <TabPanel value={tab} index={0}>
          <Dashboard />
        </TabPanel>

        <TabPanel className="relative" value={tab} index={1}>
          <UpdateForm />
        </TabPanel>

        <TabPanel value={tab} index={2}>
          <ShippingForm />
        </TabPanel>

        <TabPanel value={tab} index={3}>
          <p className="ml-3 mb-5 text-lg">Payment methods</p>
        </TabPanel>

        <TabPanel value={tab} index={4}>
          <p>History</p>
        </TabPanel>

        <TabPanel value={tab} index={5}>
          <Wishlist />
        </TabPanel>

        <TabPanel value={tab} index={6}>
          <Loyalty />
        </TabPanel>
      </div>
    </>
  );
}

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
};
