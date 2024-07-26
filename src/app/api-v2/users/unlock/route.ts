import { unlockUsers } from "@/controllers/users";
import { usersErrorHandler } from "@/utils/error-handler";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    return await unlockUsers(req);
  } catch (error) {
    return await usersErrorHandler(error);
  }
}
