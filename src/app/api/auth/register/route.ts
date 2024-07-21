import { sign } from "jsonwebtoken";
import { hash } from "argon2";
import { RegisterUserSchema } from "@/validations/auth";
import prisma from "../../../../../prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SECRET = process.env.SECRET_KEY as string;
export async function POST(req: Request) {
  try {
    const userData = await req.json();
    const user = RegisterUserSchema.parse(userData);

    const hashedPassword = await hash(user.password);
    const createUser = await prisma.user.create({
      data: { ...user, password: hashedPassword },
    });

    const jwt = sign({ id: createUser.id, status: createUser.status }, SECRET);

    const oneDay = 24 * 60 * 60 * 1000;
    cookies().set({
      name: "token",
      value: jwt,
      httpOnly: true,
      path: "/",
      expires: oneDay,
    });
  } catch (error) {
    console.log(error);
  }
}
