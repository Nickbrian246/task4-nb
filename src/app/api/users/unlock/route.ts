import { CustomNextApiRequest } from "@/types/api";
import { NextResponse } from "next/server";
import { unlockUsers } from "@/controllers/users";

import router from "@/lib/api/base-auth-router";

router.patch(unlockUsers);

export async function PATCH(
  request: CustomNextApiRequest,
  ctx: NextResponse
): Promise<NextResponse> {
  //@ts-ignore
  return router.run(request, ctx);
}
