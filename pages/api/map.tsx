import Cors from "micro-cors";
import fetch from "isomorphic-unfetch";
import type { NextApiRequest, NextApiResponse } from "next";

const corsOptions = {
  origin: "http://localhost:3000",
};

async function getEncodedPolyline(origin: string, destination: string) {
  let map = {};
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${process.env.GOOGLE_MAP_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  const encodedPolyline = data.routes[0].overview_polyline.points; //.overview_polyline.points
  const distance = data.routes[0].legs[0].distance.value;
  const duration = data.routes[0].legs[0].duration.value;

  return { ...map, distance, duration, encodedPolyline };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { lat, lng, latitude, longitude } = req.query;
  const origin = `${lat},${lng}`;
  const destination = `${latitude},${longitude}`;
  const map = await getEncodedPolyline(origin, destination);
  const distance = map.distance;
  const duration = map.duration;
  const encodedPolyline = map.encodedPolyline;
  const urlMap = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=motorcycle&dir_action=navigate&polyline=${encodedPolyline}`;
  res.json({ urlMap, distance, duration });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export const middleware = Cors(corsOptions);
