import Head from "next/head";
import { Inter } from "next/font/google";
import Link from "next/link";
import Main from "@/components/layout/Main";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Account() {
  const session = useSession();
  const router = useRouter();

  if (session.status === "unauthenticated") {
    // session.data
    signIn();
    // router.push(`/login`);
  } else {
    return (
      <>
        <Head>
          <title>Konto użytkownika</title>
          <meta name="description" content="404" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Main>
          <div>Dzień dobry {session.data?.user.email}</div>
        </Main>
      </>
    );
  }
}
