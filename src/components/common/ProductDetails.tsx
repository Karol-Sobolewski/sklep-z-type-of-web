import Image from "next/image";
import Link from "next/link";
import { useCartState } from "./Cart/CartContext";

import { ReviewContentFragment } from "../../../generated/graphql";
import ProductReviewContainer from "./ProductReview/ProductReviewContainer";

interface ProductDetails {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: Images[];
  reviews: ReviewContentFragment[];
}

// TODO: import fragmentu schema

interface Images {
  __typename?: "Asset" | undefined;
  url: string;
  height?: number | null | undefined;
  width?: number | null | undefined;
}

interface ProductProps {
  productData: ProductDetails;
}

export default function ProductDetails({ productData }: ProductProps) {
  return <>
    <div className="bg-white block overflow-hidden group shadow-xl dark:border-gray-800 border-2 rounded-lg duration-500 transition-all hover:shadow-2xl">
      <Image
        width={300}
        // width={productData.images[0].width}
        height={200}
        src={productData.images[0].url}
        alt={productData.name}
        className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
        style={{
          maxWidth: "100%",
          height: "auto",
          aspectRatio: "16/9",
          objectFit: "contain",
          maxWidth: "100%",
          height: "auto"
        }} />
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
      </div>
    </div>
    <ProductReviewContainer productData={productData} />
  </>;
}

type ProductListItem = Pick<
  ProductDetails,
  "id" | "slug" | "name" | "images" | "price"
>;

interface ProductListItemProps {
  data: ProductListItem;
}

export function ProductListItem({ data }: ProductListItemProps) {
  const cartState = useCartState();
  return (
    <div className="bg-white block overflow-hidden shadow-xl dark:border-gray-800 border-2 rounded-lg duration-500 transition-all hover:shadow-2xl">
      <Link href={`/wyroby/${data.slug}`} className="group" legacyBehavior>
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
            maxWidth: "100%",
            height: "auto"
          }} />

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
      </Link>
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
    </div>
  );
}
