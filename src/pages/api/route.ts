import { NextApiHandler, PageConfig } from "next";

const handler: NextApiHandler = async (req, res) => {
  return new Response("test");
};

export default handler;

export const config: PageConfig = {
  runtime: "experimental-edge",
};
