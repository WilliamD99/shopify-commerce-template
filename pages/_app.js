import { useEffect, useState } from "react";
// Style
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../public/styles/tailwind.css";
import "../public/styles/index.css";
import "react-toastify/dist/ReactToastify.css";
// Library
import Helmet from "react-helmet";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import loadingContext from "../utils/loadingContext";
import cartContext from "../utils/cartContext";
import userContext from "../utils/userContext";
import deviceContext from "../utils/deviceContext";
import { customerGet } from "../utils/api/requests";

import Layout from "../components/layout";
import AgeGate from "../components/AgeGate";
import { getCookie } from "../utils/utils";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({ state: "loading" });
  const [cookie, setCookie] = useState(
    typeof document !== "undefined" ? getCookie("tn").slice(1, -1) : ""
  );
  const [isMobile, setMobile] = useState("none");

  useEffect(() => {
    setMobile(
      Boolean(
        navigator.userAgent.match(
          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
      )
    );
  }, []);

  useEffect(() => {
    let items = JSON.parse(localStorage.getItem("items"));
    if (items !== null) {
      setCart(JSON.parse(localStorage.getItem("items")));
    }
  }, []);

  // Cookie
  useEffect(() => {
    if (cookie) {
      let fetchUser = async () => {
        let data = await customerGet({ accessToken: cookie });
        setUser(data.data.customer);
      };
      fetchUser();
    } else {
      setUser({ state: "none" });
    }
  }, []);

  const getLayout = Component.getLayout || ((page) => page);

  if (isMobile === "none")
    return (
      <>
        <p>Test</p>
      </>
    );

  return getLayout(
    <>
      <Helmet>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="keywords" content="" />
        {/* Need change */}
        <meta name="description" content="" />
        <meta name="author" content="willD" />
        <meta
          name="apple-mobile-web-app-title"
          content="" // Content here
        />
        <meta name="application-name" content="" />
        <meta name="msapplication-TileColor" content="#cc9966" />
        <meta
          name="msapplication-config"
          content="images/icons/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Template</title>
        <link
          rel="mask-icon"
          href="images/icons/safari-pinned-tab.svg"
          color="#666666"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Helmet>
      {/* <AgeGate /> */}
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <deviceContext.Provider value={{ isMobile }}>
            <userContext.Provider value={{ user, setUser }}>
              <cartContext.Provider value={{ cart, setCart }}>
                <loadingContext.Provider value={{ loading, setLoading }}>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </loadingContext.Provider>
              </cartContext.Provider>
            </userContext.Provider>
          </deviceContext.Provider>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
