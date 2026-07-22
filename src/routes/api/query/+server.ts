import { getFilteredResolutions } from "$lib/server/db/queries";

export const GET = async ({ url }: { url: any }) => {
  console.log("GET request received with query parameters:", url.searchParams.toString());
  const query = url.searchParams.get("q");

  if (!query) {
    return new Response(JSON.stringify({ error: "Missing query parameter 'q'" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  const res = await getFilteredResolutions(query);

  return new Response(JSON.stringify({ res }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
