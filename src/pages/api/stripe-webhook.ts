import { NextApiHandler } from "next";

const stripeWebhook: NextApiHandler = (req, res) => {
  const payload = req.body;
  console.log(payload);

  res.status(204).end();
};

export default stripeWebhook;
