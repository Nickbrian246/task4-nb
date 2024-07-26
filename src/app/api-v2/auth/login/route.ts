import { login } from "@/controllers/auth/login";
import { errorHandler } from "@/utils/error-handler";
import { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  try {
    return await login(req);
  } catch (error) {
    return await errorHandler(error);
  }
}
