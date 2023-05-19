import { NextApiHandler } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import {
  GetOrdersForAccountDocument,
  GetOrdersForAccountQuery,
  GetOrdersForAccountQueryVariables,
} from "../../../generated/graphql";
import { authApolloClient } from "@/graphql/apolloClient";

const OrderHistoryHandler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  //   console.log(`session`, session);
  if (!session) {
    console.log(`error`);
    return res.status(500).end();
  }
  const userOrders = await authApolloClient.query<
    GetOrdersForAccountQuery,
    GetOrdersForAccountQueryVariables
  >({
    query: GetOrdersForAccountDocument,
    variables: {
      email: session?.user.email,
    },
  });
  console.log(`res`, userOrders);
  res.json({ userOrders: userOrders.data.account?.orders });
};

export default OrderHistoryHandler;

/*
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

const UserHandler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions); 

*/
