import { getResolutions } from "./api/query/+server";
import { redirect } from "@sveltejs/kit";

export const load = async ({ url }: { url: any }) => {
  if (url.searchParams.has("q")) {
    const query = url.searchParams.get("q");
    if (!query) {
      redirect(308, "/?q=A%2FRES%2F80%2F")
    }

    return { res: getResolutions(query), query };
  } else {
    redirect(308, "/?q=A%2FRES%2F80%2F")
  }
}
