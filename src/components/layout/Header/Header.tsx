import Navigation from "../Navigation/Navigation";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Header() {
  return (
    <header className="max-w-md mx-auto w-full px-4 py-2">
      <Navigation />
    </header>
  );
}
