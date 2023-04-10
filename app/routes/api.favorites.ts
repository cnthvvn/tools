import type { ActionArgs } from "@remix-run/node";

import { addToFavorite, removeToFavorite } from "~/services/tools";
import { AppError, response } from "~/utils";

export async function action({ request }: ActionArgs) {
  try {
    const formData = await request.formData();
    const toolId = formData.get("toolId") as string;

    const method = request.method.toLowerCase();
    switch (method) {
      case "delete": {
        const tool = await removeToFavorite(toolId);
        return response.ok({ tool }, { authSession: null });
      }
      case "post": {
        const tool = await addToFavorite(toolId);
        return response.ok({ tool }, { authSession: null });
      }
      default: {
        throw new AppError({
          message: "Method not allowed",
          metadata: { method, toolId },
        });
      }
    }
  } catch (cause) {
    return response.error(cause, { authSession: null });
  }
}
