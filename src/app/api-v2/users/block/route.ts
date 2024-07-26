import { blockUsers } from "@/controllers/users";
import { usersErrorHandler } from "@/utils/error-handler";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    return await blockUsers(req);
  } catch (error) {
    return await usersErrorHandler(error);
  }
}
