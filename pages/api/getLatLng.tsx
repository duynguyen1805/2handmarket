import Cors from "micro-cors";
import fetch from "isomorphic-unfetch";
import type { NextApiRequest, NextApiResponse } from "next";

const corsOptions = {
  origin: "http://localhost:3000",
};

// async function getEncodedPolyline(origin: string, destination: string) {
//   const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${process.env.GOOGLE_MAP_API_KEY}`;
//   const response = await fetch(url);
//   const data = await response.json();
//   const encodedPolyline = data.routes[0].overview_polyline.points; //.overview_polyline.points
//   return encodedPolyline;
// }

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query;

  if (typeof address !== "string") {
    return res.status(200).json({ error: "Invalid address" });
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${process.env.GOOGLE_MAP_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();
  if (data.status === "OK") {
    const lat = data.results[0].geometry.location.lat;
    const lng = data.results[0].geometry.location.lng;
    return res.json(`${lat},${lng}`);
  } else {
    throw new Error("Unable to getLatLng From Address");
  }
  res.json({});
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export const middleware = Cors(corsOptions);
