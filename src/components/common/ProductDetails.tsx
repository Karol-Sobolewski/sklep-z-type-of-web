import Image from "next/image";
import Link from "next/link";
import { useCartState } from "./Cart/CartContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { setLocale } from "yup";

import {
  GetProductBySlugDocument,
  GetProductBySlugQuery,
  GetProductsListDocument,
  GetProductsListQuery,
  GetProductsListQueryVariables,
  useCreateProductReviewMutation,
} from "../../../generated/graphql";
import { apolloClient } from "@/graphql/apolloClient";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Loading from "./Loading";

interface ProductDetails {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: Images[];
  reviews: Review[];
}

// TODO: import fragmentu schema
// console.log(`GetProductBySlugQuery`, GetProductBySlugQuery);
interface Images {
  __typename?: "Asset" | undefined;
  url: string;
  height?: number | null | undefined;
  width?: number | null | undefined;
}

interface Review {
  __typename?: "Review" | undefined;
  id: string | number;
  headline: string | null | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
  content: string | null | undefined;
  rating: number | null | undefined;
  createdAt: string | null | undefined;
}

interface ProductProps {
  productData: ProductDetails;
}

export default function ProductDetails({ productData }: ProductProps) {
  const [createReview, { data, loading, error }] =
    useCreateProductReviewMutation();

  const reviewFormSchema = yup
    .object({
      headline: yup.string().required("Podaj tytuł"),
      name: yup.string().required("Podaj imię"),
      emailAddress: yup
        .string()
        .email("Podaj poprawny adres email")
        .required("Podaj poprawny adres email"),
      rating: yup.number().required("Pole wymagane"),
      content: yup.string().required("Napisz komentarz"),
    })
    .required();
  type ReviewFormData = yup.InferType<typeof reviewFormSchema>;

  const { register, setValue, handleSubmit, formState, reset } =
    useForm<ReviewFormData>({
      resolver: yupResolver(reviewFormSchema),
    });

  const onSubmit = handleSubmit((reviewData) => {
    createReview({
      variables: {
        review: {
          headline: reviewData.headline,
          name: reviewData.name,
          email: reviewData.emailAddress,
          content: reviewData.content,
          rating: reviewData.rating,
          product: {
            connect: {
              id: productData.id,
            },
          },
        },
      },
    });
  });

  useEffect(() => {
    if (data) {
      reset();
    }
  }, [data]);

  return (
    <>
      <div className="bg-white block overflow-hidden group shadow-xl dark:border-gray-800 border-2 rounded-lg duration-500 transition-all hover:shadow-2xl">
        <Image
          width={300}
          // width={productData.images[0].width}
          height={200}
          style={{
            maxWidth: "100%",
            height: "auto",
            aspectRatio: "16/9",
            objectFit: "contain",
          }}
          src={productData.images[0].url}
          alt={productData.name}
          className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
        />
        <div className="relative p-3 bg-white">
          <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
            {productData.name}
          </h3>
          <p className="tracking-wider text-gray-900">
            {productData.description}
          </p>
          <p className="mt-2">
            <span className="sr-only"> Regular Price </span>
            <span className="tracking-wider text-gray-900">
              {" "}
              {productData.price / 100} Zł
            </span>
          </p>
        </div>
      </div>
      <section className="bg-gray-100 dark:bg-gray-600 rounded-lg my-4">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold sm:text-2xl">Opinie Klientów</h2>

          <div className="mt-4 flex items-center gap-4">
            <p className="text-3xl font-medium">
              4.0
              <span className="sr-only"> Average review score </span>
            </p>

            <div>
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-200"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>

              <p className="mt-0.5 text-xs text-gray-500">
                Liczba opinii: {productData.reviews.length}
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-2 ">
            {productData.reviews.map((review) => (
              <div key={review.id}>
                <blockquote>
                  <header className="sm:flex sm:items-center sm:gap-4">
                    <div className="flex">
                      {[...Array(review.rating)].map((x, i) => (
                        <div key={i}>
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-yellow-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>{" "}
                        </div>
                      ))}
                      {[...Array(review.rating && 5 - review.rating)].map(
                        (x, i) => (
                          <div key={i}>
                            {" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-200"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                        )
                      )}
                    </div>

                    <p className="mt-2 font-medium sm:mt-0">
                      {review.headline}
                    </p>
                  </header>

                  <p className="mt-2 text-gray-700 dark:text-white">
                    {review.content}
                  </p>

                  <div className="mt-4">
                    <p className="text-xs text-gray-500">
                      {review.name} -{" "}
                      {review.createdAt &&
                        new Date(review.createdAt)
                          .toISOString()
                          .split("T")[0]
                          .replaceAll("-", ".")}
                    </p>
                  </div>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        {loading && <Loading />}
        {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-2 lg:py-12">
              <p className="max-w-xl text-lg">
                Zostaw swoją opinię o produkcie
              </p>
            </div>

            <div className="rounded-lg bg-white dark:bg-gray-700 p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="sr-only" htmlFor="headline">
                      Tytuł
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Tytuł"
                      type="text"
                      id="headline"
                      {...register("headline")}
                    />
                    <span
                      role="alert"
                      className="text-sm font-bold text-red-500"
                    >
                      {formState.errors.headline?.message}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-5 text-gray-600 ">
                  <label>
                    <div>
                      <input type="radio" value={1} {...register("rating")} />1
                    </div>
                  </label>
                  <label>
                    <div>
                      <input type="radio" value={2} {...register("rating")} />2
                    </div>
                  </label>
                  <label>
                    <div>
                      <input type="radio" value={3} {...register("rating")} />3
                    </div>
                  </label>
                  <label>
                    <div>
                      <input type="radio" value={4} {...register("rating")} />4
                    </div>
                  </label>
                  <label>
                    <div>
                      <input type="radio" value={5} {...register("rating")} />5
                    </div>
                  </label>
                  <span role="alert" className="text-sm font-bold text-red-500">
                    {formState.errors.rating?.message}
                  </span>
                </div>

                <div>
                  <label className="sr-only" htmlFor="message">
                    Wiadomość
                  </label>

                  <textarea
                    className="w-full rounded-lg border-gray-200 p-3 text-sm  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Wiadomość"
                    rows={8}
                    id="message"
                    {...register("content")}
                  ></textarea>
                  <span role="alert" className="text-sm font-bold text-red-500">
                    {formState.errors.content?.message}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="name">
                      Imię
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Imię"
                      type="text"
                      id="name"
                      {...register("name")}
                    />
                    <span
                      role="alert"
                      className="text-sm font-bold text-red-500"
                    >
                      {formState.errors.name?.message}
                    </span>
                  </div>
                  <div>
                    <label className="sr-only" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Email"
                      type="email"
                      id="email"
                      {...register("emailAddress")}
                    />
                    <span
                      role="alert"
                      className="text-sm font-bold text-red-500"
                    >
                      {formState.errors.emailAddress?.message}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                  >
                    Wyślij
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {data && (
        <div className="w-60 fixed z-10 bottom-20 right-80 justify-center self-end py-5 px-5 md:py-4 bg-green-400">
          Opinia dodana
        </div>
      )}
    </>
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
          width={300}
          height={200}
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
              {data.price / 100} Zł
            </span>
          </p>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => {
          cartState.addItemToCart({
            id: data.id,
            images: data.images[0].url,
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
