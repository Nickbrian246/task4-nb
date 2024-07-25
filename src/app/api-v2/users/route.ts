import { Prisma } from "@prisma/client";
import { users, deleteUsers } from "@/controllers/users";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {
  try {
    return await users(req);
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
export async function DELETE(req: NextRequest) {
  try {
    return await deleteUsers(req);
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
