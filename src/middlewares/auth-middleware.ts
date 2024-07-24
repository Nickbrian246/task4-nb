import { DecodedUser } from "@/types/api";
import { verify } from "jsonwebtoken";
import { NextHandler } from "next-connect";
import { NextResponse } from "next/server";
import prisma from "../../prisma";
const SECRET = process.env.SECRET_KEY as string;
const authMiddleware = async (req: Request, event: any, next: NextHandler) => {
  try {
    const token = req.headers.get("Authorization");

    if (!token)
      return NextResponse.json(
        { message: "User not logged " },
        { status: 400 }
      );

    const jwt = token.split(" ").pop() as string;
    const { id } = verify(jwt, SECRET) as DecodedUser;
    const { status } = await prisma.user.findFirstOrThrow({
      where: { id },
    });

    if (status === "BLOCKED")
      return NextResponse.json({ message: "UserBlocked" }, { status: 400 });

    return await next();
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong please contact support" },
      { status: 400 }
    );
  }
};

export default authMiddleware;
