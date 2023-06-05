import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Order, useGetOrdersForAccountQuery } from "../../../generated/graphql";

export default function UserOrderList() {
  const session = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>();

  const getOrders = async () => {
    await fetch("/api/orderHistory", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      return response
        .json()
        .then((data) => {
          console.log({ data });
          setOrders(data.userOrders.reverse());
          return data;
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  // console.log(`orderFetch`, data);

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 dark:divide-slate-800 bg-white text-sm dark:bg-slate-600">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Numer zamówienia
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Data złożenia
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Status zamówienia
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Wartość
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Akcja
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-slate-800">
          {orders &&
            orders.map((order: Order) => {
              const date = new Date(order.createdAt).toLocaleDateString(
                "pl-PL"
              );

              const hour = new Date(order.createdAt).toLocaleTimeString(
                "pl-Pl",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              );
              return (
                <tr
                  key={order.id}
                  className="odd:bg-gray-50 dark:odd:bg-slate-500"
                >
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-black">
                    {`${date} ${hour}`}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-900">
                    {order.state}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-900">
                    {order.total && order.total / 100}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-900">
                    <button type="button">Podgląd</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
