// pages/api/createOrder.ts
import { NextApiRequest, NextApiResponse } from "next";
import momoMiddleware from "../../middleware/Momo_middleware";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req) {
    const data: {} = req.body;
    await momoMiddleware(req, res, data);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
