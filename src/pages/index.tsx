import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Hero from "@/components/layout/Header/Hero";
import Main from "@/components/layout/Main";
import ProductBox from "@/components/common/ProductDetails";
import { gql, useQuery } from "@apollo/client";
import Loading from "@/components/common/Loading";
import { apolloClient } from "@/graphql/apolloClient";
import {
  CreateProductReviewDocument,
  CreateProductReviewMutation,
  CreateProductReviewMutationVariables,
  useCreateProductReviewMutation,
} from "../../generated/graphql";
import NewsletterForm from "@/components/common/NewsletterForm";

export default function Home() {
  const [createReview, { data, loading, error }] =
    useCreateProductReviewMutation();

  const addReview = () => {
    createReview({
      variables: {
        review: {
          headline: "Super22211111",
          name: "Karol",
          email: "karol@gmail.com",
          content: "Super!!!1jeden",
          rating: 5,
        },
      },
    });
  };

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
          <button type="button" onClick={() => addReview()}>
            Dodaj komentarz
          </button>
          {loading && <Loading />}
          {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
          {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
        <NewsletterForm />
      </Main>
    </>
  );
}
