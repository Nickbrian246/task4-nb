import { CustomNextApiRequest } from "@/types/api";
import { NextResponse } from "next/server";
import { blockUsers } from "@/controllers/users";
import router from "@/lib/api/base-auth-router";

router.patch(blockUsers);

export async function PATCH(
  request: CustomNextApiRequest,
  ctx: NextResponse
): Promise<NextResponse> {
  //@ts-ignore
  return router.run(request, ctx);
}
