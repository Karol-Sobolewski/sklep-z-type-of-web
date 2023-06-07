import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import Main from "@/components/layout/_Main";
import { useRouter } from "next/router";

import Stripe from "stripe";

const inter = Inter({ subsets: ["latin"] });

export default function CheckoutSuccessPage() {
  const { query } = useRouter();

  return (
    <>
      <Head>
        <title>Zamówienie poprawne</title>
        <meta name="description" content="404" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <div>Przetwarzanie zamówienia</div>
        <div>{query?.session_id}</div>
      </Main>
    </>
  );
}
