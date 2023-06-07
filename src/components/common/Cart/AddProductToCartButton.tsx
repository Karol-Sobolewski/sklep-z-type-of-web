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

export default function AddProductToCart(data: ProductListItem) {
  const cartState = useCartState();
  console.log(data);
  return (
    <button
      type="button"
      onClick={() => {
        cartState.addItemToCart({
          id: data.id,
          slug: data.slug,
          image: "https://media.graphassets.com/Rd4ObmSXqogF1q1kfUlQ",
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
