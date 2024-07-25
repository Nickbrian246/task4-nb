import { unlockUsers } from "@/controllers/users";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function PATCH(req: NextRequest) {
  try {
    return await unlockUsers(req);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          errors: error.errors,
          message: error.message,
        },
        { status: 400 }
      );
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "something went wrong" },
      { status: 400 }
    );
  }
}
