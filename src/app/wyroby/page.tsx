import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Main from "@/components/layout/_Main";
import Pagination from "@/components/common/Pagination";

import { ProductListItem } from "@/components/common/ProductDetails";
import { InferGetStaticPropsType } from "next";
// import { useState } from "react";

import { useRouter } from "next/router";
import { GetProductsListDocument } from "../../../generated/graphql";
import { apolloClient } from "@/graphql/apolloClient";
export default async function ProductsPage() {
  //   const router = useRouter();
  const { data } = await apolloClient.query<GetProductsListResponse>({
    query: GetProductsListDocument,
  });

  //   const [currentPage, setCurrentPage] = useState(1);
  //   const pageNumberLimit = 5;
  //   const [maxPageLimit, setMaxPageLimit] = useState(5);
  //   const [minPageLimit, setMinPageLimit] = useState(0);
  //   const paginate = (pageNumber: any) => {
  //     setCurrentPage(pageNumber);
  //     router.push(`wyroby/strona/${pageNumber}`);
  //   };

  return (
    <>
      <Head>
        <title>Nasze Wyroby</title>
        <meta name="description" content="Nasze Wyroby" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div>
            <h2 className="text-xl font-bold dark:text-gray-300 text-gray-900 sm:text-3xl">
              Product Collection
            </h2>

            <p className="mt-4 max-w-md text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
              praesentium cumque iure dicta incidunt est ipsam, officia dolor
              fugit natus?
            </p>
          </div>

          <div className="mt-8">
            <p className="text-right text-sm dark:text-gray-100 text-gray-500">
              <span> 4 </span> z 40
            </p>
          </div>

          <ul className="mt-4 grid gap-6 grid-col-1 sm:grid-cols-2 lg:grid-cols-4">
            {data.products.map((item) => (
              <li key={item.id}>
                <ProductListItem data={item} />
              </li>
            ))}
          </ul>
          {/* <Pagination
            currentPage={currentPage}
            paginate={paginate}
            totalPages={10}
            minPageLimit={minPageLimit}
            maxPageLimit={maxPageLimit}
          /> */}
        </div>
      </Main>
    </>
  );
}

// export interface StoreApiResponse {
//   id: string;
//   title: string;
//   price: number;
//   description: string;
//   image: string;
//   creationAt: string;
//   updatedAt: string;
//   category: Category;
// }

// export interface Category {
//   id: number;
//   name: string;
//   image: string;
//   creationAt: string;
//   updatedAt: string;
// }

export interface GetProductsListResponse {
  products: Product[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  images: Image[];
}

export interface Image {
  url: string;
  height: number;
  width: number;
}
