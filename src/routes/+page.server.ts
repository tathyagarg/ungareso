import { db } from "$lib/server/db"
import { reso } from "$lib/server/db/schema"
import { eq } from "drizzle-orm";

export const load = async () => {
  let res = await db.query.reso.findMany({
    where: eq(reso.session, 80),
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
    ],
  }).then((res) => {
    return res.map((r) => {
      return {
        ...r,
        total_yes: r.votes.filter((v) => v.vote === "Y").length,
        total_no: r.votes.filter((v) => v.vote === "N").length,
        total_abstain: r.votes.filter((v) => v.vote === "A").length,
        total_absent: r.votes.filter((v) => v.vote === "X").length,
      }
    })
  })

  return { res };
}
