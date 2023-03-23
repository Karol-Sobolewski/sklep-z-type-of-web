import Navigation from "./Navigation";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Header() {
  return (
    <header className="flex flex-col mx-auto w-full ">
      <Navigation />
    </header>
  );
}
