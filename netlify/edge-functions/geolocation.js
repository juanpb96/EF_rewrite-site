import { GEO_HEADERS } from "./utils/constants.js";

const externalUrl = "https://juanbonilla-fem-weather-app.netlify.app";

export default async (request, context) => {
  const { country, city, latitude, longitude } = context.geo;
  // request.headers.set(GEO_HEADERS.country, country?.name ?? "");
  // request.headers.set(GEO_HEADERS.city, city ?? "");
  // request.headers.set(GEO_HEADERS.latitude, String(latitude ?? 0));
  // request.headers.set(GEO_HEADERS.longitude, String(longitude ?? 0));
  console.log(request.url);

  try {
    const response = await fetch(externalUrl);

    const headers = new Headers(response.headers);
    headers.set(GEO_HEADERS.country, country?.name ?? "");
    headers.set(GEO_HEADERS.city, city ?? "");
    headers.set(GEO_HEADERS.latitude, String(latitude ?? 0));
    headers.set(GEO_HEADERS.longitude, String(longitude ?? 0));
    return new Response(response.body, { status: response.status, headers });
    // You can modify headers, status, etc., if needed
    // For example, to set a specific Content-Type:
    // const headers = new Headers(response.headers);
    // headers.set("Content-Type", "text/html");
    // return new Response(response.body, { status: response.status, headers });

    // return response; // Return the fetched response directly
  } catch (error) {
    context.log("Error fetching external resource:", error);
    return new Response("Error fetching external content", { status: 500 });
  }
};

export const config = {
  path: "/test",
};
