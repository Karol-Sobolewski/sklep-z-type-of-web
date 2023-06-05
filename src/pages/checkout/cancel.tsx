import Head from "next/head";
import Image from "next/legacy/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import Main from "@/components/layout/Main";

const inter = Inter({ subsets: ["latin"] });

export default function CheckoutCancelPage() {
  return (
    <>
      <Head>
        <title>Błąd zamówienia</title>
        <meta name="description" content="404" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <div>Błąd zamówienia</div>
      </Main>
    </>
  );
}
