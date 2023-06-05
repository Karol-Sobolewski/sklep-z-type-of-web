import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Main from "@/components/layout/Main";
import CheckoutForm from "@/components/common/CheckoutForm";

export default function CheckoutPage() {
  return (
    <>
      <Head>
        <title>Podsumowanie zamówienia</title>
        <meta name="description" content="Podsumowanie zamówienia" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <CheckoutForm />
      </Main>
    </>
  );
}
