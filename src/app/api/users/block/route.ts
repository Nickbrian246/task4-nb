import { CustomNextApiRequest } from "@/types/api";
import { NextResponse } from "next/server";
import { blockUsers } from "@/controllers/users";

import router from "@/lib/api/base-router";

router.patch(blockUsers);

export async function PATCH(request: CustomNextApiRequest, ctx: NextResponse) {
  return router.run(request, ctx);
}
