import { Inter } from "next/font/google";

interface ProductProps {
  data: {
    title: string;
    description: string;
    images: string[];
    price: number;
  };
}

export default function ({ data }: ProductProps) {
  return (
    <a
      href="#"
      className="block overflow-hidden group shadow-xl dark:border-gray-800 border-2 rounded-lg duration-500 transition-all hover:shadow-2xl"
    >
      <img
        src={data.images[0]}
        alt={data.title}
        className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
      />

      <div className="relative p-3 bg-white">
        <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
          {data.title}
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
  );
}
