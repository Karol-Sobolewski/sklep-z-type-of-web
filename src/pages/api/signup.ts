import { NextApiHandler } from "next";
import * as bcrypt from "bcrypt";
import {
  CreateAccountDocument,
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from "../../../generated/graphql";
import { apolloClient, authApolloClient } from "@/graphql/apolloClient";

const SignUpHandler: NextApiHandler = async (req, res) => {
  //TODO: Edge Api Route

  const { email, password } = req.body;
  //   const crypto = require("crypto");
  //   const hash = await crypto.createHash("sha256", password).digest("hex");
  const hash = await bcrypt.hash(password, 12);

  const user = await authApolloClient.mutate<
    CreateAccountMutation,
    CreateAccountMutationVariables
  >({
    mutation: CreateAccountDocument,
    variables: {
      email: email,
      password: hash,
    },
  });

  res.json({ userId: user.data?.createAccount?.id });
};

export default SignUpHandler;
