import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import Main from "../layout";

const inter = Inter({ subsets: ["latin"] });

export default function FourOhFourPage() {
  return (
    <>
      <Head>
        <title>404</title>
        <meta name="description" content="404" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <div>
          Nie znaleziono strony przejdź do  <Link href="/">strony głównej</Link>
         
        </div>
      </Main>
    </>
  );
}
