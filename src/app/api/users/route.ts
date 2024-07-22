import { CustomNextApiRequest } from "@/types/api";
import { NextResponse } from "next/server";
import { users } from "@/controllers/users";

import router from "@/lib/api/base-router";

router.get(users);

export async function GET(request: CustomNextApiRequest, ctx: NextResponse) {
  return router.run(request, ctx);
}
