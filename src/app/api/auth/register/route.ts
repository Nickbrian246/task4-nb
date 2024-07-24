import { CustomNextApiRequest } from "@/types/api";
import { NextResponse } from "next/server";
import { register } from "@/controllers/auth/register";

import router from "@/lib/api/base-router";

router.post(register);

export async function POST(
  request: CustomNextApiRequest,
  ctx: NextResponse
): Promise<NextResponse> {
  //@ts-ignore
  return router.run(request, ctx);
}
