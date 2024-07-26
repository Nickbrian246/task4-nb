import { LoginUserSchema } from "@/validations/auth";
import { compare } from "bcrypt";
import { signJwt } from "@/lib/jose";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma";

export const login = async (req: NextRequest): Promise<NextResponse> => {
  const userData = await req.json();
  userData.date = new Date(userData.date);
  const { email, password, date } = LoginUserSchema.parse(userData);

  const user = await prisma.user.findFirstOrThrow({
    where: { email },
  });
  await prisma.user.update({
    where: { email },
    data: { lastLogin: date },
  });

  if (user.status === "BLOCKED") {
    return NextResponse.json(
      {
        message: `You are not authorized to perform this action because your account is blocked. `,
      },
      { status: 400 }
    );
  }

  const verifyPassword = await compare(password, user.password);

  if (!verifyPassword)
    return NextResponse.json(
      {
        message: `The password entered for ${email} is incorrect.`,
      },
      { status: 400 }
    );

  const jwt = await signJwt({ id: user.id, status: user.status });

  return NextResponse.json({
    data: { userName: user.name },
    medaData: { access_token: jwt },
  });
};
