import type { NextRequest } from "next/server";
import authMiddleware from "./middlewares/auth-middleware";

export async function middleware(request: NextRequest) {
  return await authMiddleware(request);
}

export const config = {
  matcher: "/api-v2/users/:path*",
};
