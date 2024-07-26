import { RegisterUserSchema } from "@/validations/auth";
import { hash } from "bcrypt";

import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import { signJwt } from "@/lib/jose";

const saltRounds = process.env.SALTROUNDS as string;

export const register = async (req: Request): Promise<NextResponse> => {
  const userData = await req.json();
  userData.date = new Date(userData.date) as Date;
  const user = RegisterUserSchema.parse(userData);

  const hashedPassword = await hash(user.password, Number(saltRounds));

  const createUser = await prisma.user.create({
    data: {
      email: user.email,
      name: user.name,
      password: hashedPassword,
      position: user.position,
      lastLogin: user.date,
    },
  });

  const jwt = await signJwt({ id: createUser.id, status: createUser.status });

  return NextResponse.json({
    data: { userName: createUser.name },
    medaData: { access_token: jwt },
  });
};
