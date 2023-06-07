import { NextApiHandler, PageConfig } from "next";
import Stripe from "stripe";
import { StripeWebhookEvents } from "../../../stripeEvents";
import { authApolloClient } from "@/graphql/apolloClient";
// import {
//   CreateNewOrderDocument,
//   CreateNewOrderMutation,
//   CreateNewOrderMutationVariables,
// } from "../../../generated/graphql";
import { Readable } from "stream";

const stripeWebhook: NextApiHandler = async (req, res) => {
  //TODO: Edge Api Route

  async function buffer(readable: Readable) {
    const chunks = [];
    for await (const chunk of readable) {
      chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
  }

  const body = await buffer(req);

  // let event = req.body as StripeWebhookEvents;
  //TODO: verify signing secret
  //return

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const stripeWebhookKey = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey || !stripeWebhookKey) {
    res.status(500).end();
    return;
  }

  // const buf = await buffer(req);
  const stripe = new Stripe(stripeSecretKey, { apiVersion: "2022-11-15" });
  const signature = req.headers["stripe-signature"];

  //   if (e.type === "checkout.session.completed") {
  //     event.data.object.success_url;
  //   }

  if (typeof signature !== "string") {
    res.status(500).end();
    return;
  }

  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    stripeWebhookKey
  ) as StripeWebhookEvents;

  switch (event.type) {
    case "checkout.session.completed":
      //TODO: zaktualizuj zamówienie w hygraph
      console.log(`Zaktualizuj zamówienie`);

      // await authApolloClient.mutate<
      //   CreateNewOrderMutation,
      //   CreateNewOrderMutationVariables
      // >({
      //   mutation: CreateNewOrderDocument,
      //   variables: {
      //     order: {
      //       email: "",
      //       stripeCheckoutId: req.body.data.object.id,
      //       total: req.body.data.object.amount,
      //       // state: "Opłacono",
      //     },
      //   },
      // });

      res.json({ received: true });
      return;
  }
  res.status(204).end();
};
export default stripeWebhook;

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
