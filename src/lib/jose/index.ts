import { Status } from "@prisma/client";
import { SignJWT, jwtVerify, JWTPayload } from "jose";
interface UserDecoded extends JWTPayload {
  id: string;
  status: Status;
}
const secret: string = process.env.SECRET_KEY as string;
const secretKey = new TextEncoder().encode(secret);
export async function signJwt(payload: any): Promise<string> {
  try {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secretKey);
  } catch (error) {
    throw new Error("Error al firmar el token JWT");
  }
}

export async function verifyJwt(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });
    return payload as UserDecoded;
  } catch (error) {
    throw new Error("Error al veirficar el token JWT");
  }
}
