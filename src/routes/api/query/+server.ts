import { db } from "$lib/server/db";
import { reso } from "$lib/server/db/schema";
import { ilike, or } from "drizzle-orm";

export const getResolutions = async (query: string) => {
  return await db.query.reso.findMany({
    where: or(
      ilike(reso.title, `%${query}%`),
      ilike(reso.symbol, `%${query}%`)
    ),
    with: {
      votes: {
        columns: {
          member_code: true,
          vote: true
        }
      }
    },
    orderBy: (reso, { desc }) => [
      desc(reso.date),
      desc(reso.symbol)
    ]
  }).then((results) => {
    return results.map((r) => ({
      ...r,
      total_yes: r.votes.filter((v) => v.vote === "Y").length,
      total_no: r.votes.filter((v) => v.vote === "N").length,
      total_abstain: r.votes.filter((v) => v.vote === "A").length,
      total_absent: r.votes.filter((v) => v.vote === "X").length,
    }));
  });
}


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

  const res = await getResolutions(query);

  return new Response(JSON.stringify({ res }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
