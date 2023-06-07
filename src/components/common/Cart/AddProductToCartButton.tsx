"use client";

import {
  ProductContentFragment,
  ReviewContentFragment,
} from "../../../../generated/graphql";
import { useCartState } from "./CartContext";

type ProductListItem = Pick<
  ProductContentFragment,
  "id" | "slug" | "name" | "images" | "price"
>;

export default function AddProductToCart({ data }: { data: ProductListItem }) {
  const cartState = useCartState();
  if (!data) {
    return null;
  }
  return (
    <button
      type="button"
      onClick={() => {
        cartState.addItemToCart({
          id: data.id,
          slug: data.slug,
          image: data.images[0].url,
          name: data.name,
          price: data.price,
          qty: 1,
        });
      }}
      className="border-2 rounded-lg border-gray-800 text-gray-900 p-2 m-2 mb-4"
    >
      Dodaj do koszyka
    </button>
  );
}
