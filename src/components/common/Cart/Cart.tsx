import Link from "next/link";
import { useCartState } from "./CartContext";

export default function Cart() {
  const cartState = useCartState();

  return (
    <Link
      href="/koszyk"
      className="block border-b-4 border-transparent p-6 hover:border-red-700"
      legacyBehavior>
      <div className="inline-flex">
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <span className="sr-only">Koszyk</span>
        <span className="ml-2">{cartState.items.length}</span>
      </div>
    </Link>
  );
}
