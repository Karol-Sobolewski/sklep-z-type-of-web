import Image from "next/image";
import Link from "next/link";
import { useCartState } from "./Cart/CartContext";

interface ProductDetails {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: Image[];
}

interface Image {
  url: string;
  height: number;
  width: number;
}

interface ProductProps {
  data: ProductDetails;
}

export default function ProductDetails({ data }: ProductProps) {
  return (
    <div className="bg-white block overflow-hidden group shadow-xl dark:border-gray-800 border-2 rounded-lg duration-500 transition-all hover:shadow-2xl">
      <Image
        width={data.images[0].width}
        height={data.images[0].height}
        style={{
          maxWidth: "100%",
          height: "auto",
          aspectRatio: "16/9",
          objectFit: "contain",
        }}
        src={data.images[0].url}
        alt={data.name}
        className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
      />

      <div className="relative p-3 bg-white">
        <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
          {data.name}
        </h3>
        <p className="tracking-wider text-gray-900">{data.description}</p>
        <p className="mt-2">
          <span className="sr-only"> Regular Price </span>
          <span className="tracking-wider text-gray-900"> {data.price} Zł</span>
        </p>
      </div>
    </div>
  );
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
      <Link href={`/wyroby/${data.slug}`} className="group">
        <Image
          width={data.images[0].width}
          height={data.images[0].height}
          style={{
            maxWidth: "100%",
            height: "auto",
            aspectRatio: "2/3",
            objectFit: "contain",
          }}
          src={data.images[0].url}
          alt={data.name}
          className="h-[300px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
        />

        <div className="relative p-3 bg-white">
          <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
            {data.name}
          </h3>

          <p className="mt-2">
            <span className="sr-only"> Regular Price </span>

            <span className="tracking-wider text-gray-900">
              {" "}
              {data.price} Zł
            </span>
          </p>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => {
          cartState.addItemToCart({
            id: data.id,
            // images: data.images[0].url,
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
