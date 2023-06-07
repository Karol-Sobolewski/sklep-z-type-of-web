import Head from "next/head";
import Main from "@/components/layout/_Main";
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
} from "../../../../generated/graphql";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: { productSlug: string };
}) {
  const { data } = await apolloClient.query<
    GetProductBySlugQuery,
    GetProductBySlugQueryVariables
  >({
    variables: {
      slug: params.productSlug,
    },
    query: GetProductBySlugDocument,
  });

  //   const router = useRouter();
  if (!data || !data.product) {
    notFound();
  }

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

export async function generateStaticParams() {
  const { data } = await apolloClient.query<GetProductsListQuery>({
    query: GetProductsListDocument,
  });
  return data.products.map((product) => ({ productSlug: product.slug }));
}
