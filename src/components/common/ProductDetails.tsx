import Image from "next/image";
import Link from "next/link";
// import { useCartState } from "./Cart/CartContext";

import {
  ProductContentFragment,
  ReviewContentFragment,
} from "../../../generated/graphql";
import AddProductToCart from "./Cart/AddProductToCartButton";
import ProductReviewContainer from "./ProductReview/ProductReviewContainer";

interface ProductProps {
  productData: ProductContentFragment;
}

export default function ProductDetails({ productData }: ProductProps) {
  return (
    <>
      <div className="bg-white block overflow-hidden group shadow-xl dark:border-gray-800 border-2 rounded-lg duration-500 transition-all hover:shadow-2xl">
        <Image
          width={300}
          height={200}
          src={productData.images[0].url}
          alt={productData.name}
          className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
          style={{
            maxWidth: "100%",
            height: "auto",
            aspectRatio: "16/9",
            objectFit: "contain",
          }}
        />
        <div className="relative p-3 bg-white">
          <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
            {productData.name}
          </h3>
          <p className="tracking-wider text-gray-900">
            {productData.description}
          </p>
          <p className="mt-2">
            <span className="sr-only"> Regular Price </span>
            <span className="tracking-wider text-gray-900">
              {" "}
              {productData.price / 100} Zł
            </span>
          </p>
          <AddProductToCart data={productData} />
        </div>
      </div>
      {/* <ProductReviewContainer productData={productData} /> */}
    </>
  );
}

type ProductListItem = Pick<
  ProductContentFragment,
  "id" | "slug" | "name" | "images" | "price"
>;

interface ProductListItemProps {
  data: ProductListItem;
}

export function ProductListItem({ data }: ProductListItemProps) {
  return (
    <div className="bg-white block overflow-hidden shadow-xl dark:border-gray-800 border-2 rounded-lg duration-500 transition-all hover:shadow-2xl">
      <a href={`/wyroby/${data.slug}`} className="group">
        <Image
          width={300}
          height={200}
          src={data.images[0].url}
          alt={data.name}
          className="h-[300px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
          style={{
            maxWidth: "100%",
            height: "auto",
            aspectRatio: "2/3",
            objectFit: "contain",
          }}
        />

        <div className="relative p-3 bg-white">
          <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
            {data.name}
          </h3>

          <p className="mt-2">
            <span className="sr-only"> Regular Price </span>

            <span className="tracking-wider text-gray-900">
              {" "}
              {data.price / 100} Zł
            </span>
          </p>
        </div>
      </a>
      <AddProductToCart data={data} />
    </div>
  );
}
