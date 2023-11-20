import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import jwt from "jsonwebtoken";
import { sign, verify, Secret } from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  // const token = req.body.token;

  // if (session && session.user) {
  //   return res.status(200).json({ hasPermission: true });
  // } else if (token !== null) {
  //   let jwt_key = "2handmarket_tdn" || process.env.NEXT_PUBLIC_JWT_SECRET;
  //   if (!jwt_key) {
  //     throw new Error(
  //       "JWT_SECRET is not defined in the environment variables."
  //     );
  //   }
  //   const jwt_secret: Secret = jwt_key;
  //   try {
  //     const decoded = jwt.verify(token, jwt_secret);
  //     if (decoded) {
  //       return res.status(200).json({ hasPermission: true });
  //     }
  //   } catch (error) {
  //     console.log("Lỗi decoded token: ", error);
  //     return res.status(403).json({ hasPermission: false });
  //   }
  // } else {
  //   return res.status(403).json({ hasPermission: false });
  // }
  if (session && session.user) {
    return res.status(200).json({ hasPermission: true, session: session });
  } else {
    return res.status(403).json({ hasPermission: false });
  }
}
