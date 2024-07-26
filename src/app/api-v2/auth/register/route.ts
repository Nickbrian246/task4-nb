import { register } from "@/controllers/auth/register";
import { errorHandler } from "@/utils/error-handler";
import { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  try {
    return await register(req);
  } catch (error) {
    return await errorHandler(error);
  }
}
