import Head from "next/head";
import Image from "next/legacy/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import Main from "@/components/layout/Main";
import { useRouter } from "next/router";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Loading from "@/components/common/Loading";
import ProductDetails from "@/components/common/ProductDetails";
import { apolloClient } from "@/graphql/apolloClient";
import { gql } from "@apollo/client";
import {
  GetProductBySlugDocument,
  GetProductBySlugQuery,
  GetProductBySlugQueryVariables,
  GetProductsListDocument,
  GetProductsListQuery,
  GetProductsListQueryVariables,
} from "../../../generated/graphql";

export default function ProductPage({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (!data || !data.product) return <Loading />;
  return (
    <>
      <Head>
        <title>{data.product.name}</title>
        <meta name="description" content="Produkt" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <ProductDetails
          productData={{
            id: data.product.id,
            slug: data.product.slug,
            name: data.product.name,
            images: data.product.images,
            price: data.product.price,
            description: data.product.description,
            reviews: data.product.reviews,
          }}
        />
      </Main>
    </>
  );
}

export const getStaticPaths = async () => {
  // const res = await fetch(`https://naszsklep-api.vercel.app/api/products`);
  // const data: StoreApiResponse[] = await res.json();
  const { data } = await apolloClient.query<GetProductsListQuery>({
    query: GetProductsListDocument,
  });
  return {
    paths: data.products.map((product) => {
      return {
        params: {
          productSlug: product.slug,
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
  if (!params?.productSlug) {
    return {
      props: {},
      notFound: true,
    };
  }

  // const res = await fetch(
  //   `https://naszsklep-api.vercel.app/api/products/${params.productSlug}`
  // );
  // const data: StoreApiResponse | null = await res.json();
  const { data } = await apolloClient.query<
    GetProductBySlugQuery,
    GetProductBySlugQueryVariables
  >({
    variables: {
      slug: params.productSlug,
    },
    query: GetProductBySlugDocument,
  });

  if (!data.product) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
};

// export interface StoreApiResponse {
//   id: string;
//   name: string;
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

// export interface GetProductBySlugResponse {
//   product: Product;
// }

// export interface GetProductsListBySlugResponse {
//   products: Product[];
// }

// export interface Product {
//   id: string;
//   slug: string;
//   name: string;
//   price: number;
//   images: Image[];
//   description: string;
// }

// export interface Image {
//   url: string;
//   height: number;
//   width: number;
// }
