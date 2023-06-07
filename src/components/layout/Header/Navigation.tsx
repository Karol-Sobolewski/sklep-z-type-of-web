import Cart from "@/components/common/Cart/Cart";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

const menu = [
  { title: "Strona domowa", path: "/" },
  { title: "O nas", path: "/onas" },
  { title: "Wyroby", path: "/wyroby" },
  // { title: "WyrobyCSR", path: "/wyroby-csr" },
];

export default function Navigation() {
  "use client";
  // const pathname = usePathname();
  // const session = useSession();

  return (
    <div className="flex h-16 items-center justify-center px-4 py-2">
      <div className="flex  items-center justify-between mx-auto w-full max-w-7xl">
        <div className="flex items-center gap-4">
          <button type="button" className="p-2 lg:hidden">
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <a href="/#" className="flex">
            <span className="sr-only">Logo</span>
            <span className="inline-block h-10 w-10 rounded-lg bg-red-800">
              LOGO
            </span>
          </a>
        </div>

        <div className="flex flex-1 items-center justify-end gap-8">
          <nav
            aria-label="Site Nav"
            className="hidden lg:flex lg:gap-4 lg:text-xs lg:font-bold lg:uppercase lg:tracking-wide lg:text-gray-500 dark:lg:text-white"
          >
            <ul className="flex gap-6">
              {menu.map((link, index) => {
                return (
                  <li key={index}>
                    <Link
                      // className={` hover:text-red-800  ${
                      //   pathname !== `/` && pathname === link.path
                      //     ? `  border-red-800 text-red-800`
                      //     : ``
                      // }`}
                      href={link.path}
                      legacyBehavior
                    >
                      {link.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center">
            <div className="flex items-center divide-x divide-gray-100 border-x border-gray-100">
              <Cart />

              {/* <span>
                <a
                  href={
                    session.status === "authenticated" ? `/konto` : `/login`
                  }
                  className="block border-b-4 border-transparent p-6 hover:border-red-700"
                >
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>

                  <span className="sr-only"> Konto </span>
                </a>
              </span> */}

              <span className="hidden sm:block">
                <a
                  href="/search"
                  className="block border-b-4 border-transparent p-6 hover:border-red-700"
                >
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>

                  <span className="sr-only"> Search </span>
                </a>
              </span>
              {/* {session.status === "authenticated" ? (
                <span className="hidden sm:block">
                  <button
                    onClick={() => signOut({ callbackUrl: `/` })}
                    className="block border-b-4 border-transparent p-6 hover:border-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                      />
                    </svg>

                    <span className="sr-only"> Wyloguj </span>
                  </button>
                </span>
              ) : null} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
