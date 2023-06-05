import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Main from "@/components/layout/Main";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function LangPage() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Lang</title>
        <meta name="description" content="O nas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <div>
          <ul>
            {router.locales?.map((locale) => (
              <li key={locale}>
                <Link locale={locale} href={router.asPath}>
                  {locale}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Main>
    </>
  );
}
