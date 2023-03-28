import { Inter } from "next/font/google";
import Link from "next/link";

interface ProductDetails {
  id: number;
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
    <div className="block overflow-hidden group shadow-xl dark:border-gray-800 border-2 rounded-lg duration-500 transition-all hover:shadow-2xl">
      <img
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
  return (
    <Link
      href={`/wyroby/${data.id}`}
      className="block overflow-hidden group shadow-xl dark:border-gray-800 border-2 rounded-lg duration-500 transition-all hover:shadow-2xl"
    >
      <img
        src={data.image}
        alt={data.title}
        className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
      />

      <div className="relative p-3 bg-white">
        <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
          {data.title}
        </h3>

        <p className="mt-2">
          <span className="sr-only"> Regular Price </span>

          <span className="tracking-wider text-gray-900"> {data.price} Zł</span>
        </p>
      </div>
    </Link>
  );
}
