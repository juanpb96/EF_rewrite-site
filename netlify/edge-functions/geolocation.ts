import { GEO_HEADERS } from "./utils/constants.ts";
import type { Config, Context } from "@netlify/edge-functions";

export default async function handler(request: Request, context: Context) {
  const { country, city, latitude, longitude } = context.geo;
  request.headers.set(GEO_HEADERS.country, country?.name ?? "");
  request.headers.set(GEO_HEADERS.city, city ?? "");
  request.headers.set(GEO_HEADERS.latitude, String(latitude ?? 0));
  request.headers.set(GEO_HEADERS.longitude, String(longitude ?? 0));
  console.log(request.url);
}
