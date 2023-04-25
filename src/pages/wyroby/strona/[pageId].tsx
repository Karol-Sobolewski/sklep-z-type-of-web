import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import Main from "@/components/layout/Main";
import { useRouter } from "next/router";
import {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextApiRequest,
  NextApiResponse,
} from "next";
import Loading from "@/components/common/Loading";
import ProductDetails, {
  ProductListItem,
} from "@/components/common/ProductDetails";
import { useState } from "react";
import Pagination from "@/components/common/Pagination";
import { redirect } from "next/navigation";
import { apolloClient } from "@/graphql/apolloClient";
import { gql } from "@apollo/client";
import {
  GetProductsListDocument,
  GetProductsListQuery,
  GetProductsListQueryVariables,
  GetProductsPagesDocument,
  GetProductsPagesQuery,
} from "../../../../generated/graphql";

export default function ProductPage({
  data,
  page,
  pageSize,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(page);
  const pageNumberLimit = 5;
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const [paginationPages, setPaginationPages] = useState(pageSize);

  const paginate = (pageNumber: number) => {
    if (pageNumber === 1) {
      router.push("/wyroby");
    }
    setCurrentPage(pageNumber);
    if (pageNumber < pageNumberLimit - 2) {
      setMaxPageLimit(pageNumberLimit);
    } else {
      setMaxPageLimit(pageNumber + 2);
    }
    setMinPageLimit(pageNumber - 3);
    router.push(`${pageNumber}`);
  };

  if (!data) return <Loading />;

  if (router.isFallback) return <Loading />;

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
            {data.products.map((item) => {
              return (
                <li key={item.id}>
                  <ProductListItem data={item} />
                </li>
              );
            })}
          </ul>

          <Pagination
            currentPage={page}
            paginate={paginate}
            totalPages={paginationPages}
            minPageLimit={minPageLimit}
            maxPageLimit={maxPageLimit}
          />
        </div>
      </Main>
    </>
  );
}

export const getStaticPaths = async () => {
  return {
    paths: Array.from({ length: 10 }, (_, i) => i + 1).map((i) => {
      return {
        params: {
          pageId: i.toString(),
        },
      };
    }),
    fallback: true,
  };
};

export type InferGetStaticPathsType<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? R
  : never;

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<InferGetStaticPathsType<typeof getStaticPaths>>) => {
  const page = Number(params?.pageId) || 1;
  if (!params?.pageId) {
    return {
      props: {},
      notFound: true,
    };
  }

  // const res = await fetch(
  //   `https://naszsklep-api.vercel.app/api/products?take=25&offset=${
  //     (page - 1) * 25
  //   }`
  // );
  // const data: StoreApiResponse[] = await res.json();

  const { data } = await apolloClient.query<
    GetProductsListQuery,
    GetProductsListQueryVariables
  >({
    variables: {
      first: 1,
      skip: page - 1,
    },
    query: GetProductsListDocument,
  });

  const productsConnection = await apolloClient.query<GetProductsPagesQuery>({
    query: GetProductsPagesDocument,
  });

  const pageSize = productsConnection.data.productsConnection.pageInfo.pageSize;
  return {
    props: {
      data,
      page: page,
      pageSize: pageSize,
    },
  };
};

// export interface GetProductsListResponse {
//   products: Product[];
//   productsConnection: pageInfo;
// }

// export interface Product {
//   id: string;
//   slug: string;
//   name: string;
//   price: number;
//   images: Image[];
// }

// export interface pageInfo {
//   pageInfo: pageSize;
// }

// export interface pageSize {
//   pageSize: number;
// }

// export interface Image {
//   url: string;
//   height: number;
//   width: number;
// }

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
//   id: string;
//   name: string;
//   image: string;
//   creationAt: string;
//   updatedAt: string;
// }
