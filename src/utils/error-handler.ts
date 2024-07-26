import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { NextResponse } from "next/server";
export async function errorHandler<T = unknown>(error: T) {
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

export async function usersErrorHandler<T = unknown>(error: T) {
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
