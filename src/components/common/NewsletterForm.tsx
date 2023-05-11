import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";

const useAddToNewsletterMutation = () =>
  useMutation(async ({ email }: { email: string }) => {
    await fetch("http://localhost:3000/api/hello/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  });

export default function NewsletterForm() {
  const newsletterFormSchema = yup
    .object({
      email: yup
        .string()
        .email("Podaj poprawny adres email")
        .required("Podaj poprawny adres email"),
    })
    .required();

  type NewsletterFormData = yup.InferType<typeof newsletterFormSchema>;

  const { register, setValue, handleSubmit, formState, reset } =
    useForm<NewsletterFormData>({
      resolver: yupResolver(newsletterFormSchema),
    });

  const { mutate, isLoading, isSuccess, isError } =
    useAddToNewsletterMutation();

  const onSubmit = handleSubmit((data) => {
    console.log("data", data);
    // fetch("http://localhost:3000/api/hello/", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email: data.email }),
    // });
    mutate(data);
  });
  //   mutation.mutate();

  return (
    <div className="mx-auto max-w-screen-2xl flex flex-col">
      Zapisz się do newslettera
      <form onSubmit={onSubmit}>
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="block text-xs font-medium text-gray-700 dark:text-white"
          >
            Email*
          </label>

          <input
            autoComplete="email"
            type="text"
            id="email"
            {...register("email")}
            className="mt-1 rounded-md border-gray-200 shadow-sm sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <span role="alert" className="text-sm font-bold text-red-500 w-60">
            {formState.errors.email?.message}
          </span>
        </div>

        <div className="col-span-6">
          <button
            type="submit"
            className="block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg"
          >
            Zapisz się
          </button>
        </div>
      </form>
    </div>
  );
}
