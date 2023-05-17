import { NextApiHandler } from "next";
import { buffer } from "micro";
import Stripe from "stripe";
import { StripeWebhookEvents } from "../../../stripeEvents";

const stripeWebhook: NextApiHandler = async (req, res) => {
  //   let event = req.body as StripeWebhookEvents;
  //TODO: verify signing secret
  //return

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const stripeWebhookKey = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey || !stripeWebhookKey) {
    res.status(500).end();
    return;
  }

  const buf = await buffer(req);
  const stripe = new Stripe(stripeSecretKey, { apiVersion: "2022-11-15" });
  const signature = req.headers["stripe-signature"] as string;

  let event;
  //   console.log(event);
  //   if (e.type === "checkout.session.completed") {
  //     event.data.object.success_url;
  //   }

  try {
    event = stripe.webhooks.constructEvent(buf, signature, stripeWebhookKey);
  } catch (err) {
    res.status(400).send(`Webhook Error`);
    console.error(`Webhook signature not verified`, err);
    return;
  }
  switch (event.type) {
    case "checkout.session.completed":
      //TODO: zaktualizuj zamówienie w hygraph
      console.log(`Zaktualizuj zamówienie`);
      res.json({ received: true });
      return;
  }
  res.status(204).end();
};
export default stripeWebhook;
