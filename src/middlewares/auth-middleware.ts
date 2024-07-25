import { verifyJwt } from "@/lib/jose";
import { NextResponse } from "next/server";

const authMiddleware = async (req: Request) => {
  try {
    const token = req.headers.get("Authorization");

    if (!token)
      return NextResponse.json(
        { message: "User not logged " },
        { status: 400 }
      );

    const jwt = token.split(" ").pop() as string;
    const { id } = await verifyJwt(jwt);
    const reqHeaders = new Headers(req.headers);

    reqHeaders.set("user", id);

    return NextResponse.next({
      request: {
        headers: reqHeaders,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong please contact support" },
      { status: 400 }
    );
  }
};

export default authMiddleware;
