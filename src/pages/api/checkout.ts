import { apolloClient, authApolloClient } from "@/graphql/apolloClient";
import { NextApiHandler } from "next";
import { Stripe } from "stripe";
import {
  GetProductBySlugForCheckoutDocument,
  GetProductBySlugForCheckoutQuery,
  GetProductBySlugForCheckoutQueryVariables,
} from "../../../generated/graphql";

const checkoutHandler: NextApiHandler = async (req, res) => {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    res.status(500).json({ message: `Missing STRIPE_SECRET_KEY` });
    return;
  }

  const body = req.body as {
    slug: string;
    qty: number;
  }[];

  const products = await Promise.all(
    body.map(async (cartItem) => {
      const apiProduct = await authApolloClient.query<
        GetProductBySlugForCheckoutQuery,
        GetProductBySlugForCheckoutQueryVariables
      >({
        query: GetProductBySlugForCheckoutDocument,
        variables: {
          slug: cartItem.slug,
        },
      });

      //   if (!cartItem) {
      //     res.status(500).json({ message: `Błąd serwera` });
      //     return;
      //   }

      return {
        apiProduct,
        qty: cartItem.qty,
      };
    })
  );

  //   const products = await Promise.all(
  //     body.map(async (cartItem) => {
  //       const product = apolloClient.query<
  //         GetProductBySlugForCheckoutQuery,
  //         GetProductBySlugForCheckoutQueryVariables
  //       >({
  //         query: GetProductBySlugDocument,
  //         variables: {
  //           slug: cartItem.slug,
  //         },
  //       });

  //       return {
  //         product,
  //         qty: req.body.qty,
  //       };
  //     })
  //   );

  const stripe = new Stripe(stripeSecretKey, { apiVersion: "2022-11-15" });

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "pl",
    payment_method_types: ["p24", "card"],
    success_url:
      "http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/checkout/cancel",
    line_items: products.map((product) => {
      return {
        adjustable_quantity: {
          enabled: true,
          minimum: 0,
          maximum: 99,
        },
        price_data: {
          currency: "PLN",
          unit_amount: product.apiProduct.data.product!.price,
          product_data: {
            name: product.apiProduct.data.product!.name,
            images: product.apiProduct.data.product!.images.map(
              (i: { url: string }) => i.url
            ),
            metadata: { slug: product.apiProduct.data.product!.slug },
          },
        },
        quantity: product.qty,
      };
    }),
  });

  //TODO: reset koszyka
  //TODO: Zamówienie w Hygraph

  res.status(201).json({ session: stripeCheckoutSession });
};

export default checkoutHandler;
