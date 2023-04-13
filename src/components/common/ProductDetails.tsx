import Image from "next/image";
import Link from "next/link";
import { useCartState } from "./Cart/CartContext";

interface ProductDetails {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

interface ProductProps {
  data: ProductDetails;
}

export default function ProductDetails({ data }: ProductProps) {
  return (
    <div className="bg-white block overflow-hidden group shadow-xl dark:border-gray-800 border-2 rounded-lg duration-500 transition-all hover:shadow-2xl">
      <Image
        width={885}
        height={500}
        style={{
          maxWidth: "100%",
          height: "auto",
          aspectRatio: "16/9",
          objectFit: "contain",
        }}
        src={data.image}
        alt={data.title}
        className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
      />

      <div className="relative p-3 bg-white">
        <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
          {data.title}
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

type ProductListItem = Pick<ProductDetails, "id" | "title" | "image" | "price">;

interface ProductListItemProps {
  data: ProductListItem;
}

export function ProductListItem({ data }: ProductListItemProps) {
  const cartState = useCartState();
  return (
    <div className="bg-white block overflow-hidden shadow-xl dark:border-gray-800 border-2 rounded-lg duration-500 transition-all hover:shadow-2xl">
      <Link href={`/wyroby/${data.id}`} className="group">
        <Image
          width={200}
          height={300}
          style={{
            maxWidth: "100%",
            height: "auto",
            aspectRatio: "2/3",
            objectFit: "contain",
          }}
          src={data.image}
          alt={data.title}
          className="h-[300px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
        />

        <div className="relative p-3 bg-white">
          <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
            {data.title}
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
            image: data.image,
            title: data.title,
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
