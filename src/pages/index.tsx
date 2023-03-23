import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Hero from "@/components/layout/Header/Hero";
import Main from "@/components/layout/Main";
import ProductBox from "@/components/common/ProductBox";
const inter = Inter({ subsets: ["latin"] });

const DATA = {
  title: `Product 1`,
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tristique
  nibh ac massa congue, ac faucibus ex placerat. Aliquam eu fermentum
  diam, vel tincidunt leo.`,
  images: [`https://picsum.photos/id/237/536/354`],
  price: 100,
};

interface ProductProps {
  data: {
    title: string;
    description: string;
    imagePath: string;
    price?: number;
  };
}

const Product = ({ data }: ProductProps) => {
  return (
    <a href="#" className="block overflow-hidden group">
      <img
        src={data.imagePath}
        alt={data.title}
        className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
      />

      <div className="relative p-3 bg-white">
        <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
          {data.title}
        </h3>

        <p className="mt-2">
          <span className="sr-only"> Regular Price </span>

          <span className="tracking-wider text-gray-900"> £24.00 GBP </span>
        </p>
      </div>
    </a>
  );
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Manufaktura Zakonna</title>
        <meta name="description" content="Sklep on-line Manufaktury Zakonnej" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <Main>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8 ">
          <div>
            <h2 className="text-xl font-bold dark:text-gray-300 text-gray-900 sm:text-3xl">
              Wyróżnione produkty
            </h2>

            <p className="max-w-md mt-4 dark:text-gray-100 text-gray-500 ">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
              praesentium cumque iure dicta incidunt est ipsam, officia dolor
              fugit natus?
            </p>
          </div>

          <ul className="grid md:grid-cols-3 grid-cols-2 gap-6 pt-6">
            <li>
              <ProductBox data={DATA} />
            </li>
            <li>
              <ProductBox data={DATA} />
            </li>
            <li>
              <ProductBox data={DATA} />
            </li>
          </ul>
        </div>

        {/* <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
         
          <Product data={DATA} />
          <Product data={DATA} />
        </div> */}
      </Main>
    </>
  );
}
