// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' })
// }

import type { NextApiRequest, NextApiResponse } from "next";

import corsMiddleware from "../../utils/middleware";
import Cors from "micro-cors";

const cors = Cors();

export default corsMiddleware(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Your API logic here
});
