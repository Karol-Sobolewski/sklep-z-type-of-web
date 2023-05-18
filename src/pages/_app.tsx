import "../styles/globals.css";
import Layout from "../components/layout/Layout";

import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

import { Suspense } from "react";
import Loading from "@/components/common/Loading";
import { CartStateContextProvider } from "@/components/common/Cart/CartContext";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/graphql/apolloClient";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const queryClient = new QueryClient();
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <CartStateContextProvider>
          <Layout>
            <QueryClientProvider client={queryClient}>
              <Suspense fallback={<Loading />}>
                <Component {...pageProps} />
              </Suspense>
            </QueryClientProvider>
          </Layout>
        </CartStateContextProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
