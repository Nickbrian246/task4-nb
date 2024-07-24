import { login } from "@/controllers/auth/login";
import { CustomNextApiRequest } from "@/types/api";
import { NextResponse } from "next/server";

import router from "@/lib/api/base-router";

router.post(login);

export async function POST(
  request: CustomNextApiRequest,
  ctx: NextResponse
): Promise<NextResponse> {
  //@ts-ignore
  return router.run(request, ctx);
}
