// middleware/momoMiddleware.ts
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import crypto from "crypto";

export default async function momoMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  data: any
) {
  try {
    const response = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      {
        partnerCode: data.partnerCode,
        partnerName: data.partnerName,
        requestType: data.requestType,
        ipnUrl: data.ipnUrl,
        redirectUrl: data.redirectUrl,
        orderId: data.orderId,
        amount: data.amount,
        lang: data.lang,
        autoCapture: data.autoCapture,
        orderInfo: data.orderInfo,
        requestId: data.requestId,
        extraData: data.extraData,
        signature: data.signature,
      }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi ở middleware" });
  }
}
