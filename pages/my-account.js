import React, { useState, useContext, useEffect } from "react";
import UpdateForm from "../components/User/user-update";
import ShippingForm from "../components/User/shipping-update";
import userContext from "../utils/userContext";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Loading from "../components/Loading/dataLoading";

import useCustomerDeleteAccessToken from "../utils/hooks/useCustomerDeleteAccessToken";
import useCustomerGet from "../utils/hooks/useCustomerGet";
import { accessTokenExist, accessTokenDelete } from "../utils/utils";
import Dashboard from "../components/User/dashboard";

export default function Account() {
  const { user, setUser } = useContext(userContext);
  const [tab, setTab] = useState(0);

  const customer = useCustomerGet();
  const deleteAccessToken = useCustomerDeleteAccessToken();

  const handleChangeTab = (e, newValue) => {
    setTab(newValue);
  };

  const handleLogout = () => {
    let token = accessTokenExist();
    deleteAccessToken.mutate({ accessToken: token });
  };

  useEffect(() => {
    if (accessTokenExist()) {
      customer.mutate({ accessToken: accessTokenExist() });
    }
  }, []);

  useEffect(() => {
    if (customer.data) {
      setUser(customer.data.customer);
      console.log(customer.data.customer);
    }
  }, [customer.data]);

  // Remove access token
  useEffect(() => {
    if (deleteAccessToken.data && !deleteAccessToken.isLoading) {
      setUser();
      localStorage.removeItem("items");
      accessTokenDelete();
    }
  }, [deleteAccessToken.isLoading]);

  if (customer.isLoading) return <Loading />;
  if (!user)
    return (
      <>
        <p className="text-center text-xl mt-44">You&apos;re not login yet!</p>
      </>
    );

  return (
    <>
      <div className="flex flex-col ml-20">
        <Tabs className="mb-12" value={tab} onChange={handleChangeTab}>
          <Tab label="Dashboard" />
          <Tab label="Personal Info" />
          <Tab label="Shipping" />
          <Tab label="Payment" />
          <Tab label="History" />
          <Tab label="Wishlist" />
        </Tabs>

        <TabPanel value={tab} index={0}>
          <Dashboard />
        </TabPanel>

        <TabPanel value={tab} index={1}>
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
          <p>Wishlist</p>
        </TabPanel>
      </div>
      {/* <Button onClick={handleLogout}>Logout</Button> */}
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
