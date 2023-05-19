import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import { authApolloClient } from "@/graphql/apolloClient";
import {
  GetAccountByEmailDocument,
  GetAccountByEmailQuery,
  GetAccountByEmailQueryVariables,
} from "../../../../generated/graphql";

export const authOptions = {
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Hasło", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        if (!credentials) {
          return null;
        }
        // const crypto = require("crypto");

        const userByEmail = await authApolloClient.query<
          GetAccountByEmailQuery,
          GetAccountByEmailQueryVariables
        >({
          query: GetAccountByEmailDocument,
          variables: {
            email: credentials?.username,
          },
        });

        if (!userByEmail.data.account?.password) {
          return null;
        }

        const arePasswordsEqual = await bcrypt.compare(
          credentials.password,
          userByEmail.data.account.password
        );

        if (!arePasswordsEqual) {
          return null;
        }
        return {
          id: userByEmail.data.account.id,
          email: userByEmail.data.account.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
export default NextAuth(authOptions);
