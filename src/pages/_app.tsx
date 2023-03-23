import "../styles/globals.css";
import Layout from "../components/layout/Layout";

import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import Loading from "@/components/common/Loading";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loading />}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Suspense>
    </QueryClientProvider>
  );
}
