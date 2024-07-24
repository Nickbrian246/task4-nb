import { RegisterUserSchema } from "@/validations/auth";
import { hash } from "argon2";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

const SECRET = process.env.SECRET_KEY as string;

export const register = async (req: Request) => {
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
};
