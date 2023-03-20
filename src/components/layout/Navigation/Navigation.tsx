import Link from "next/link";
import { useRouter } from "next/router";
const menu = [
  { title: "Strona domowa", path: "/" },
  { title: "O nas", path: "/about" },
  { title: "Produkty", path: "/produkty" },
];

export default function Navigation() {
  // const router = useRouter();
  return (
    <nav className="dark:text-yellow-400">
      <ul className="flex gap-6">
        {menu.map((link, index) => (
          <li key={index}>
            <Link href={link.path}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
