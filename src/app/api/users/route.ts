import { CustomNextApiRequest } from "@/types/api";
import { NextResponse } from "next/server";
import { users, deleteUsers } from "@/controllers/users";

import router from "@/lib/api/base-router";

router.get(users);
router.delete(deleteUsers);

export async function GET(request: CustomNextApiRequest, ctx: NextResponse) {
  return router.run(request, ctx);
}
export async function DELETE(request: CustomNextApiRequest, ctx: NextResponse) {
  return router.run(request, ctx);
}
