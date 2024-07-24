import { ApiFailureResponse, ApiSuccessResponseWithData } from "@/types/api";
import { User } from "@prisma/client";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getUsers(
  token: string
): Promise<ApiSuccessResponseWithData<User[]>> {
  try {
    const req = await fetch(`${BASE_URL}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!req.ok) {
      const errorResponse: ApiFailureResponse = await req.json();
      throw new Error(errorResponse.message || "Unknown error occurred");
    }
    return await req.json();
  } catch (error) {
    throw error;
  }
}
