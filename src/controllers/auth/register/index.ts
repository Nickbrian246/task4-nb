import { RegisterUserSchema } from "@/validations/auth";
import { hash } from "argon2";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import prisma from "../../../prisma";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

interface AuthUserResponse {
  name: string;
}

interface MetaData {
  access_token: string;
}

const SECRET = process.env.SECRET_KEY as string;

export const register = async (req: Request) => {
  try {
    const userData = await req.json();
    const user = RegisterUserSchema.parse(userData);

    const hashedPassword = await hash(user.password);
    const createUser = await prisma.user.create({
      data: { ...user, password: hashedPassword },
    });

    const jwt = sign({ id: createUser.id, status: createUser.status }, SECRET);
    return NextResponse.json({
      data: { userName: createUser.name },
      medaData: { access_token: jwt },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002")
        return NextResponse.json({ message: `This email already exist ` });
      return NextResponse.json({ message: `${error.message}` });
    }
    if (error instanceof ZodError) {
      return NextResponse.json({ message: `${error.message}` });
    }
    return NextResponse.json({
      message: `something went wrong please contact support`,
    });
  }
};
