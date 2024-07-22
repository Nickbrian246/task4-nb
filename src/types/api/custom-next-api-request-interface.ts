import { NextApiRequest } from "next";
import { Status } from "@prisma/client";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
export interface DecodedUser {
  id: string;
  status: Status;
}
export interface CustomNextApiRequest<RequestBody = unknown>
  extends NextRequest {
  user: DecodedUser;
}
