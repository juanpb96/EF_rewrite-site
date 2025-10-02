import { GEO_HEADERS } from "./utils/constants.js";

const externalUrl = "https://juan-edge-function-test.netlify.app/test/";
// const externalUrl = "http://localhost:65104/test";

export default async (request, context) => {
  console.log(request.url);

  try {
    const headers = new Headers(request.headers);
    headers.set("x-geo-context", JSON.stringify(context.geo));

    const proxyRequest = new Request(externalUrl, {
      method: request.method,
      headers: headers,
      body: request.body,
    });

    const geoData = headers.get("x-geo-context");

    if (geoData) {
      console.log(JSON.parse(geoData));
    }

    // 2. Add the custom header before fetching

    const response = await fetch(proxyRequest);

    console.log("Initial response:", response);

    return response;
  } catch (error) {
    context.log("Error fetching external resource:", error);
    return new Response("Error fetching external content", { status: 500 });
  }
};
