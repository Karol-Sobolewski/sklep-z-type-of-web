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
  //TODO: Edge Api Route

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
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
  res.json({ userOrders: userOrders.data.account?.orders });
};

export default OrderHistoryHandler;
