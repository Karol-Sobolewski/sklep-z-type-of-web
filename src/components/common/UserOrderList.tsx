import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGetOrdersForAccountQuery } from "../../../generated/graphql";

export default function UserOrderList() {
  const session = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState();
  //   console.log(email);

  //   const { data, loading, error } = useGetOrdersForAccountQuery({
  //     variables: {
  //       email: email,
  //     },
  //   });

  console.log(session.data?.user.email);
  const getOrders = async () => {
    const orderFetch = await fetch("/api/orderHistory", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    console.log(`orderFetch`, orderFetch);
  };

  useEffect(() => {
    getOrders();
  }, []);
  return <div>Lista</div>;
}
