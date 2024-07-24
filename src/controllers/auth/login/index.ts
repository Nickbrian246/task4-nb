import { LoginUserSchema } from "@/validations/auth";
import { verify } from "argon2";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma";
const SECRET = process.env.SECRET_KEY as string;

export const login = async (req: NextRequest): Promise<NextResponse> => {
  const userData = await req.json();
  const { email, password } = LoginUserSchema.parse(userData);

  const user = await prisma.user.findFirstOrThrow({
    where: { email },
  });

  if (user.status === "BLOCKED") {
    return NextResponse.json(
      {
        message: `You are not authorized to perform this action because your account is blocked. `,
      },
      { status: 400 }
    );
  }
  const verifyPassword = await verify(user.password, password);
  if (!verifyPassword)
    return NextResponse.json(
      {
        message: `The password entered for ${email} is incorrect.`,
      },
      { status: 400 }
    );

  const jwt = sign({ id: user.id, status: user.status }, SECRET);

  return NextResponse.json({
    data: { userName: user.name },
    medaData: { access_token: jwt },
  });
};
