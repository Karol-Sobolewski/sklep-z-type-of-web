import { FormEventHandler, useEffect } from "react";
import { useForm } from "react-hook-form";
import { validateCreditCartData } from "../../../utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { setLocale } from "yup";
const { v4: uuidv4 } = require("uuid");

import * as yup from "yup";
import { useCartState } from "./Cart/CartContext";
import { useCreateNewOrderMutation } from "../../../generated/graphql";
import Loading from "./Loading";
import { useRouter } from "next/navigation";

export default function CheckoutForm() {
  const cartState = useCartState();
  const [createOrder, { data, loading, error }] = useCreateNewOrderMutation();
  console.log(`cartState`, cartState);
  const { push } = useRouter();
  const checkoutFormSchema = yup
    .object({
      firstName: yup.string().required("Podaj imię"),
      lastName: yup.string().required("Podaj nazwisko"),
      emailAddress: yup
        .string()
        .email("Podaj poprawny adres email")
        .required("Podaj poprawny adres email"),
      phone: yup.number().required("Podaj poprawny numer telefonu"),
      cardNumber: yup.number().required("Podaj poprawny numer karty"),
      cardExpiry: yup.string().required(),
      //TODO validate
      cardCVC: yup.number().required(validateCreditCartData),

      // cardCVC: yup.number().required().test(validateCreditCartData),

      // cardCVC: yup
      //   .number()
      //   .required()
      //   .string()
      //   .matches(/(0[1-9]|1[0-2])\/([0-9]{2})/, i18n["pl"].expDateFormat)
      //   .required(i18n["pl"].requiredDefault),
      street: yup.string().required(),
      city: yup.string().required(),
      postalCode: yup.string().required(),
    })
    .required();

  setLocale({
    // use constant translation keys for messages without values
    mixed: {
      default: "Pole niepoprawne",
    },
  });
  type CheckoutFormData = yup.InferType<typeof checkoutFormSchema>;

  const { register, setValue, handleSubmit, formState, reset } =
    useForm<CheckoutFormData>({
      resolver: yupResolver(checkoutFormSchema),
    });
  const onSubmit = handleSubmit((data) => {
    createOrder({
      variables: {
        order: {
          stripeCheckoutId: uuidv4(),
          email: data.emailAddress,
          total: cartState.orderSummary.totalPrice,
          orderItems: {
            create: cartState.items.map((item) => ({
              quantity: item.qty,
              total: item.price,
              product: {
                connect: {
                  id: item.id.toString(),
                },
              },
            })),
          },
        },
      },
    });
  });

  useEffect(() => {
    if (data) {
      reset();
      cartState.clearCart();
      setTimeout(() => {
        push("/");
      }, 200);
    }
  }, [data]);

  return (
    <section>
      {loading && <Loading />}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      <h1 className="sr-only">Checkout</h1>

      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2">
        <div className="bg-gray-50 dark:bg-gray-600 py-12 md:py-24">
          <div className="mx-auto max-w-lg space-y-8 px-4 lg:px-8">
            <div>
              <p className="text-2xl font-medium tracking-tight text-gray-900 dark:text-gray-200">
                Wartość zamówienia: {cartState.orderSummary.totalPrice / 100} zł
              </p>

              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                Wyroby w zamówieniu:
              </p>
            </div>

            <div>
              <div className="flow-root">
                <ul className="-my-4 divide-y divide-gray-100">
                  {cartState.items.map((item) => (
                    <li className="flex items-center gap-4 py-4" key={item.id}>
                      <img
                        src={item.images}
                        alt=""
                        className="h-16 w-16 rounded object-cover"
                      />

                      <div>
                        <h3 className="text-sm text-gray-900 dark:text-gray-200">
                          {item.name}
                        </h3>

                        {/* <dl className="mt-0.5 space-y-px text-[10px] text-gray-600 dark:text-gray-300">
                          <div>
                            <dt className="inline">Size:</dt>
                            <dd className="inline">XXS</dd>
                          </div>

                          <div>
                            <dt className="inline">Color:</dt>
                            <dd className="inline">White</dd>
                          </div>
                        </dl> */}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-12 md:py-24 dark:bg-gray-700">
          <div className="mx-auto max-w-lg px-4 lg:px-8">
            <form className="grid grid-cols-6 gap-4" onSubmit={onSubmit}>
              <div className="col-span-3">
                <label
                  htmlFor="firstName"
                  className="block text-xs font-medium text-gray-700 dark:text-white"
                >
                  Imię*
                </label>

                <input
                  autoComplete="given-name"
                  type="text"
                  id="firstName"
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("firstName")}
                />
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="lastName"
                  className="block text-xs font-medium text-gray-700 dark:text-white"
                >
                  Nazwisko*
                </label>

                <input
                  autoComplete="family-name"
                  type="text"
                  id="lastName"
                  {...register("lastName")}
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="emailAddress"
                  className="block text-xs font-medium text-gray-700 dark:text-white"
                >
                  Email*
                </label>

                <input
                  autoComplete="email"
                  type="text"
                  id="email"
                  {...register("emailAddress")}
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <span role="alert" className="text-sm font-bold text-red-500">
                  {formState.errors.emailAddress?.message}
                </span>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="phone"
                  className="block text-xs font-medium text-gray-700 dark:text-white"
                >
                  Telefon
                </label>

                <input
                  autoComplete="tel"
                  type="tel"
                  id="phone"
                  {...register("phone")}
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <span role="alert" className="text-sm font-bold text-red-500">
                  {formState.errors.phone?.message}
                </span>
              </div>

              <fieldset className="col-span-6">
                <legend className="block text-sm font-medium text-gray-700 dark:text-white">
                  Karta płatnicza
                </legend>

                <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm dark:bg-gray-700">
                  <div>
                    <label htmlFor="cardNumber" className="sr-only">
                      {" "}
                      Numer karty{" "}
                    </label>

                    <input
                      type="text"
                      id="cardNumber"
                      {...register("cardNumber")}
                      placeholder="Numer"
                      className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      autoComplete="cc-number"
                    />
                    <span
                      role="alert"
                      className="text-sm font-bold text-red-500"
                    >
                      {formState.errors.cardNumber?.message}
                    </span>
                  </div>

                  <div className="flex">
                    <div className="flex-1">
                      <label htmlFor="cardExpiry" className="sr-only">
                        {" "}
                        Data ważności (MM/YY){" "}
                      </label>

                      <input
                        type="text"
                        autoComplete="cc-exp"
                        id="cardExpiry"
                        {...register("cardExpiry")}
                        placeholder="Data ważności (MM/YY)"
                        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <span
                        role="alert"
                        className="text-sm font-bold text-red-600"
                      >
                        {formState.errors.cardExpiry?.message}
                      </span>
                    </div>

                    <div className="-ms-px flex-1">
                      <label htmlFor="cardCVC" className="sr-only">
                        {" "}
                        CVC{" "}
                      </label>

                      <input
                        type="text"
                        id="cardCVC"
                        {...register("cardCVC")}
                        placeholder="CVC"
                        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <span
                        role="alert"
                        className="text-sm font-bold text-red-500"
                      >
                        {formState.errors.cardCVC?.message}
                      </span>
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset className="col-span-6">
                <legend className="block text-sm font-medium text-gray-700 dark:text-white">
                  Adres
                </legend>

                <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm dark:bg-gray-700">
                  <div>
                    <label className="sr-only" htmlFor="street">
                      {" "}
                      Ulica i nr*{" "}
                    </label>

                    <input
                      autoComplete="street-address"
                      type="text"
                      id="street"
                      {...register("street")}
                      placeholder="Ulica i nr*"
                      className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="city">
                      {" "}
                      Miejscowość*{" "}
                    </label>

                    <input
                      autoComplete="address-level2"
                      type="text"
                      id="city"
                      {...register("city")}
                      placeholder="Miejscowość*"
                      className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="postalCode">
                      {" "}
                      Kod pocztowy*{" "}
                    </label>

                    <input
                      autoComplete="postal-code"
                      type="text"
                      id="postalCode"
                      {...register("postalCode")}
                      placeholder="Kod pocztowy*"
                      className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
              </fieldset>

              <div className="col-span-6">
                <button
                  type="submit"
                  className="block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg"
                >
                  Złóż zamówienie
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {data && (
        <div className="w-60 fixed z-10 bottom-20 right-80 justify-center self-end py-5 px-5 md:py-4 bg-green-400">
          Zamówienie złożone
        </div>
      )}
    </section>
  );
}
