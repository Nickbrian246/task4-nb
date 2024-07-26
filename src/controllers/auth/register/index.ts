import { RegisterUserSchema } from "@/validations/auth";
import { hash } from "bcrypt";

import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import { signJwt } from "@/lib/jose";

export const register = async (req: Request): Promise<NextResponse> => {
  const userData = await req.json();
  const user = RegisterUserSchema.parse(userData);

  const hashedPassword = await hash(user.password, 5);

  const createUser = await prisma.user.create({
    data: { ...user, password: hashedPassword },
  });

  const jwt = await signJwt({ id: createUser.id, status: createUser.status });

  return NextResponse.json({
    data: { userName: createUser.name },
    medaData: { access_token: jwt },
  });
};
