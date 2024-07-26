import { deleteUsers, users } from "@/controllers/users";
import { usersErrorHandler } from "@/utils/error-handler";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    return await users(req);
  } catch (error) {
    return await usersErrorHandler(error);
  }
}
export async function DELETE(req: NextRequest) {
  try {
    return await deleteUsers(req);
  } catch (error) {
    return await usersErrorHandler(error);
  }
}
