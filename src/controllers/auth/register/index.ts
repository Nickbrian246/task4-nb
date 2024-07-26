import { RegisterUserSchema } from "@/validations/auth";
// import { hash } from "argon2";

import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import { signJwt } from "@/lib/jose";

export const register = async (req: Request): Promise<NextResponse> => {
  const userData = await req.json();
  const user = RegisterUserSchema.parse(userData);

  // const hashedPassword = await hash(user.password);
  const createUser = await prisma.user.create({
    data: { ...user },
  });

  const jwt = await signJwt({ id: createUser.id, status: createUser.status });

  return NextResponse.json({
    data: { userName: createUser.name },
    medaData: { access_token: jwt },
  });
};
