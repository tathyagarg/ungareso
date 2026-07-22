import { db } from "$lib/server/db"

export const load = async ({ params }: { params: any }) => {
  let res = await db.query.reso.findFirst({
    where: (reso, { eq }) => eq(reso.symbol, params.symbol),
    with: {
      votes: {
        columns: {
          member_code: true,
          vote: true
        }
      }
    }
  }).then((r) => {
    if (!r) {
      return null;
    }

    return {
      ...r,
      total_yes: r.votes.filter((v) => v.vote === "Y").length,
      total_no: r.votes.filter((v) => v.vote === "N").length,
      total_abstain: r.votes.filter((v) => v.vote === "A").length,
      total_absent: r.votes.filter((v) => v.vote === "X").length,
    }
  })

  return { res };
}
