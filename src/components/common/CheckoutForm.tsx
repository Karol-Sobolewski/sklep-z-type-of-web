import { FormEventHandler } from "react";
import { useForm } from "react-hook-form";
import { validateCreditCartData } from "../../../utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { setLocale } from "yup";

import * as yup from "yup";

export default function CheckoutForm() {
  const checkoutFormSchema = yup
    .object({
      firstName: yup.string().required("Podaj imię"),
      lastName: yup.string().required("Podaj nazwisko"),
      emailAddress: yup
        .string()
        .email("test")
        .required("Podaj poprawny adres email"),
      phone: yup.number().required("Podaj poprawny numer telefonu"),
      cardNumber: yup.number().required("Podaj poprawny numer karty"),
      cardExpiry: yup.string().required(),
      //TODO validate
      cardCVC: yup.number().required(),

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

  const { register, setValue, handleSubmit, formState } =
    useForm<CheckoutFormData>({
      resolver: yupResolver(checkoutFormSchema),
    });
  const onSubmit = handleSubmit((data) => console.log(`submit`, formState));
  return (
    <section>
      <h1 className="sr-only">Checkout</h1>

      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2">
        <div className="bg-gray-50 py-12 md:py-24">
          <div className="mx-auto max-w-lg space-y-8 px-4 lg:px-8">
            <div className="flex items-center gap-4">
              <span className="h-10 w-10 rounded-full bg-blue-700"></span>

              <h2 className="font-medium text-gray-900">BambooYou</h2>
            </div>

            <div>
              <p className="text-2xl font-medium tracking-tight text-gray-900">
                TOTAL PRICE
              </p>

              <p className="mt-1 text-sm text-gray-600">Wyroby w zamówieniu</p>
            </div>

            <div>
              <div className="flow-root">
                <ul className="-my-4 divide-y divide-gray-100">
                  <li className="flex items-center gap-4 py-4">
                    <img
                      src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
                      alt=""
                      className="h-16 w-16 rounded object-cover"
                    />

                    <div>
                      <h3 className="text-sm text-gray-900">
                        Basic Tee 6-Pack
                      </h3>

                      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                        <div>
                          <dt className="inline">Size:</dt>
                          <dd className="inline">XXS</dd>
                        </div>

                        <div>
                          <dt className="inline">Color:</dt>
                          <dd className="inline">White</dd>
                        </div>
                      </dl>
                    </div>
                  </li>

                  <li className="flex items-center gap-4 py-4">
                    <img
                      src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
                      alt=""
                      className="h-16 w-16 rounded object-cover"
                    />

                    <div>
                      <h3 className="text-sm text-gray-900">
                        Basic Tee 6-Pack
                      </h3>

                      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                        <div>
                          <dt className="inline">Size:</dt>
                          <dd className="inline">XXS</dd>
                        </div>

                        <div>
                          <dt className="inline">Color:</dt>
                          <dd className="inline">White</dd>
                        </div>
                      </dl>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-12 md:py-24">
          <div className="mx-auto max-w-lg px-4 lg:px-8">
            <form className="grid grid-cols-6 gap-4" onSubmit={onSubmit}>
              <div className="col-span-3">
                <label
                  htmlFor="firstName"
                  className="block text-xs font-medium text-gray-700"
                >
                  Imię*
                </label>

                <input
                  autoComplete="given-name"
                  type="text"
                  id="firstName"
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  {...register("firstName")}
                />
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="lastName"
                  className="block text-xs font-medium text-gray-700"
                >
                  Nazwisko*
                </label>

                <input
                  autoComplete="family-name"
                  type="text"
                  id="lastName"
                  {...register("lastName")}
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-gray-700"
                >
                  Email*
                </label>

                <input
                  //   autoComplete="email"
                  //   type="email"
                  id="email"
                  {...register("emailAddress")}
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                />
                {/* {console.log(`error`, formState)} */}

                <span role="alert" className="text-sm font-bold text-red-700">
                  {formState.errors.emailAddress?.message}
                </span>
              </div>
              <div className="col-span-6">
                <label
                  htmlFor="phone"
                  className="block text-xs font-medium text-gray-700"
                >
                  Telefon
                </label>

                <input
                  autoComplete="tel"
                  type="tel"
                  id="phone"
                  {...register("phone")}
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                />
              </div>

              <fieldset className="col-span-6">
                <legend className="block text-sm font-medium text-gray-700">
                  Karta płatnicza
                </legend>

                <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
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
                      className="relative mt-1 w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm"
                      autoComplete="cc-number"
                    />
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
                        {...register("cardExpiry", {
                          required: "Podaj poprawną datę",
                          //   pattern: /^\d\d\/\d\d$/,
                          //   validate: validateCreditCartData,
                        })}
                        placeholder="Data ważności (MM/YY)"
                        className="relative w-full rounded-es-md border-gray-200 focus:z-10 sm:text-sm"
                      />
                      <span
                        role="alert"
                        className="text-sm font-bold text-red-700"
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
                        className="relative w-full rounded-ee-md border-gray-200 focus:z-10 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset className="col-span-6">
                <legend className="block text-sm font-medium text-gray-700">
                  Adres
                </legend>

                <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
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
                      className="relative w-full rounded-b-md border-gray-200 focus:z-10 sm:text-sm"
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
                      className="relative w-full rounded-b-md border-gray-200 focus:z-10 sm:text-sm"
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
                      className="relative w-full rounded-b-md border-gray-200 focus:z-10 sm:text-sm"
                    />
                  </div>
                </div>
              </fieldset>

              <div className="col-span-6">
                <button
                  //   type="submit"
                  className="block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg"
                >
                  Złóż zamówienie
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
