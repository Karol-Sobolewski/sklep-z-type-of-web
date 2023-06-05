import Head from "next/head";
import Image from "next/legacy/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Main from "@/components/layout/Main";

const inter = Inter({ subsets: ["latin"] });

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About us</title>
        <meta name="description" content="O nas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <div>About</div>
      </Main>
    </>
  );
}
