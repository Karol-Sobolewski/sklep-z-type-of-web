import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Main from "@/components/layout/Main";
import { useCartState } from "@/components/common/Cart/CartContext";

export default function CartPage() {
  const cartState = useCartState();

  return (
    <>
      <Head>
        <title>Twój koszyk</title>
        <meta name="description" content="Koszyk wyrobów" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        {/* <div>Koszyk</div>
        <ul>
          {cartState.items.map((cartItem) => (
            <li key={cartItem.id}>
              {cartItem.title} {cartItem.price / 100}
            </li>
          ))}
        </ul> */}

        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <header className="text-center">
                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl dark:text-gray-200">
                  Twój Koszyk
                </h1>
              </header>

              <div className="mt-8">
                <ul className="space-y-4">
                  {cartState.items.map((cartItem) => (
                    <li className="flex items-center gap-4">
                      <img
                        src={cartItem.image}
                        alt=""
                        className="h-16 w-16 rounded object-cover"
                      />

                      <div>
                        <h3 className="text-sm text-gray-900 dark:text-gray-200">
                          {cartItem.title}
                        </h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600 dark:text-gray-400">
                          <div>
                            {/* <dt className="inline">Size:</dt> */}
                            {/* <dd className="inline">XXS</dd> */}
                          </div>

                          <div>
                            {/* <dt className="inline">Color:</dt> */}
                            {/* <dd className="inline">White</dd> */}
                          </div>
                        </dl>
                      </div>

                      <div className="flex flex-1 items-center justify-end gap-2">
                        <form>
                          <label htmlFor="Line1Qty" className="sr-only">
                            {" "}
                            Ilość{" "}
                          </label>

                          <input
                            type="number"
                            min="1"
                            value={cartItem.qty}
                            id="Line1Qty"
                            className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </form>

                        <button
                          className="text-gray-600 dark:text-gray-200 transition hover:text-red-600 "
                          aria-label="Usuń wyrób"
                          title="Usuń wyrób"
                          onClick={() => cartState.removeItem(cartItem.id)}
                        >
                          <span className="sr-only">Usuń wyrób</span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                  <div className="w-screen max-w-lg space-y-4">
                    <dl className="space-y-0.5 text-sm text-gray-700 dark:text-gray-200">
                      <div className="flex justify-between">
                        <dt>Wartość zamówienia:</dt>
                        <dd>250 zł</dd>
                      </div>

                      <div className="flex justify-between">
                        <dt>Wysyłka</dt>
                        <dd>20 zł</dd>
                      </div>

                      <div className="flex justify-between">
                        <dt>Zniżka</dt>
                        <dd>-30 zł</dd>
                      </div>

                      <div className="flex justify-between !text-base font-medium">
                        <dt>Do zapłaty</dt>
                        <dd>200 zł</dd>
                      </div>
                    </dl>

                    <div className="flex justify-end">
                      <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700 dark:text-indigo-900">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="-ml-1 mr-1.5 h-4 w-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                          />
                        </svg>

                        <p className="whitespace-nowrap text-xs">
                          Gratulacje! Udało Ci się zaoszczędzić ZZ,GG zł na tym
                          zamówieniu.
                        </p>
                      </span>
                    </div>

                    <div className="flex justify-end">
                      <a
                        href="#"
                        className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                      >
                        Dalej
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Main>
    </>
  );
}
