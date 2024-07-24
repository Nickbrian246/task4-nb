import { Status } from "@prisma/client";
import { NextRequest } from "next/server";
interface DecodedUser {
  id: string;
  status: Status;
}
export interface CustomNextApiRequest<RequestBody = unknown>
  extends NextRequest {
  user: DecodedUser;
}
