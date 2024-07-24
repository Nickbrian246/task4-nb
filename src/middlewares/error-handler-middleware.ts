import { NextHandler } from "next-connect";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
const errorHandlerMiddleware = async (
  req: NextRequest,
  params: unknown,
  next: NextHandler
) => {
  try {
    return await next();
  } catch (error) {
    // console.error("Error:", error);

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
};

export default errorHandlerMiddleware;
