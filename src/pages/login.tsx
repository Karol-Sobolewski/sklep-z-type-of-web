import Head from "next/head";
import Main from "@/components/layout/Main";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const session = useSession();
  const router = useRouter();

  if (session.status === "authenticated") {
    // session.data
    router.push(`/konto`);
  }

  const signInFormSchema = yup
    .object({
      email: yup
        .string()
        .email("Podaj poprawny adres email")
        .required("Podaj poprawny adres email"),
      password: yup.string().required("Pole wymagane"),
    })
    .required();

  type SignUpFormData = yup.InferType<typeof signInFormSchema>;

  const { register, setValue, handleSubmit, formState, reset } =
    useForm<SignUpFormData>({
      resolver: yupResolver(signInFormSchema),
    });

  const onSubmit = handleSubmit(async (credentialsData) => {
    //     await fetch("/api/signup", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(credentialsData),
    //     });
    //     // console.log(`credentialsData`, credentialsData);
    signIn("credentials", {
      username: credentialsData.email,
      password: credentialsData.password,
      redirect: true,
      callbackUrl: "/konto",
    });
    reset();
  });
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="404" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Zaloguj się</h1>

            <p className="mt-4 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
              nulla eaque error neque ipsa culpa autem, at itaque nostrum!
            </p>
          </div>

          <form
            action=""
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
            onSubmit={onSubmit}
          >
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:text-gray-700"
                  placeholder="Email"
                  type="email"
                  id="email"
                  {...register("email")}
                />
              </div>
              <span role="alert" className="text-sm font-bold text-red-500">
                {formState.errors.email?.message}
              </span>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Hasło
              </label>

              <div className="relative">
                <input
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:text-gray-700"
                  placeholder="Hasło"
                  id="password"
                  {...register("password")}
                />
                <span role="alert" className="text-sm font-bold text-red-500">
                  {formState.errors.password?.message}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Nie masz konta? {` `}
                <a className="underline" href="/signup">
                  Zarejestruj się
                </a>
              </p>

              <button
                type="submit"
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
              >
                Zaloguj się
              </button>
            </div>
          </form>
        </div>
      </Main>
    </>
  );
}
