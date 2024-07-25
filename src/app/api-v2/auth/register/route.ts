import { register } from "@/controllers/auth/register";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    return await register(req);
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
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            message: "This email is already registered.",
          },
          { status: 400 }
        );
      }
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
