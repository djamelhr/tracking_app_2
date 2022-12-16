import { useState, useEffect } from "react";
import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layouts/header/header";
import store from "../components/redux/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import { matcherRoutes } from "../components/redux/proxy";
function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const queryClient = new QueryClient();

  const getContent = () => {
    if (matcherRoutes.includes(appProps.router.pathname))
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      );
    return <Component {...pageProps} />;
  };
  return (
    <>
      <Provider store={store}>
        <SessionProvider session={pageProps.session}>
          <QueryClientProvider client={queryClient}>
            {getContent()}
          </QueryClientProvider>
        </SessionProvider>
      </Provider>
    </>
  );
}
export default MyApp;
