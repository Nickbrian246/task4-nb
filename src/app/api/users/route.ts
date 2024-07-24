import { deleteUsers, users } from "@/controllers/users";
import router from "@/lib/api/base-auth-router";
import { CustomNextApiRequest } from "@/types/api";
import { NextResponse } from "next/server";
router.get(users);
router.delete(deleteUsers);

export async function GET(
  request: CustomNextApiRequest,
  ctx: NextResponse
): Promise<NextResponse> {
  //@ts-ignore
  return router.run(request, ctx);
}
export async function DELETE(
  request: CustomNextApiRequest,
  ctx: NextResponse
): Promise<NextResponse> {
  //@ts-ignore
  return router.run(request, ctx);
}
