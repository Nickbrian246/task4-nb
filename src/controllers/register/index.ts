import { RegisterUserSchema } from "@/validations/auth";
import { hash } from "argon2";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import prisma from "../../../prisma";

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
    console.log(userData);

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
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
};
