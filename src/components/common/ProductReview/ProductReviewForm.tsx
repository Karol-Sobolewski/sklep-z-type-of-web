import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { setLocale } from "yup";
import {
  GetReviewsForProductBySlugDocument,
  GetReviewsForProductBySlugQuery,
  ReviewContentFragment,
  Stage,
  useCreateProductReviewMutation,
} from "../../../../generated/graphql";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Loading from "../Loading";

interface ProductReviewFormProps {
  productId: string;
  productSlug: string;
}

export default function ProductReviewForm({
  productId,
  productSlug,
}: ProductReviewFormProps) {
  const [createReview, { data, loading, error }] =
    useCreateProductReviewMutation({
      refetchQueries: [
        {
          query: GetReviewsForProductBySlugDocument,
          variables: {
            slug: productSlug,
          },
        },
      ],

      // update(cache, result) {
      //   // result.data?.review;
      //   const originalReviewsQuery =
      //     cache.readQuery<GetReviewsForProductBySlugQuery>({
      //       query: GetReviewsForProductBySlugDocument,
      //       variables: {
      //         slug: productSlug,
      //       },
      //     });
      //   if (!originalReviewsQuery?.product?.reviews || !result.data?.review) {
      //     return;
      //   }
      //   console.log(`originalReviewsQuery`, originalReviewsQuery);

      //   const newReviewsQuery = {
      //     ...originalReviewsQuery,
      //     product: {
      //       ...originalReviewsQuery.product,
      //       reviews: [
      //         ...originalReviewsQuery.product?.reviews,
      //         result.data.review,
      //       ],
      //     },
      //   };

      //   cache.writeQuery({
      //     query: GetReviewsForProductBySlugDocument,
      //     variables: {
      //       slug: productSlug,
      //     },
      //     data: newReviewsQuery,
      //   });
      //   if (!result.errors) {
      //     reset();
      //     console.log("Opinia dodana");
      //   }
      // },
    });

  const reviewFormSchema = yup
    .object({
      headline: yup.string().required("Podaj tytuł"),
      name: yup.string().required("Podaj imię"),
      email: yup
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
          ...reviewData,
          product: {
            connect: {
              id: productId,
            },
          },
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        review: {
          __typename: "Review",
          id: (-Math.random()).toString(),
          stage: Stage.Draft,
          createdAt: new Date().toISOString(),
          ...reviewData,
        },
      },
    });
  });

  useEffect(() => {
    if (data && !error) {
      reset();
      alert("Opinia dodana");
      // return (
      //   <div className="w-60 fixed z-10 bottom-20 right-80 justify-center self-end py-5 px-5 md:py-4 bg-green-400">
      //     Opinia dodana
      //   </div>
      // );
    }
  }, [data, error]);

  return (
    <div>
      review
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
                      {...register("email")}
                    />
                    <span
                      role="alert"
                      className="text-sm font-bold text-red-500"
                    >
                      {formState.errors.email?.message}
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
      {/* {data && (
        <div className="w-60 fixed z-10 bottom-20 right-80 justify-center self-end py-5 px-5 md:py-4 bg-green-400">
          Opinia dodana
        </div>
      )} */}
    </div>
  );
}
