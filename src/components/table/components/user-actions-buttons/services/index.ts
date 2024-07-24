import { ApiFailureResponse, ApiSuccessResponseWithData } from "@/types/api";
import { User } from "@prisma/client";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function blockUsers(
  token: string,
  ids: any[]
): Promise<ApiSuccessResponseWithData<User[]>> {
  try {
    const req = await fetch(`${BASE_URL}/users/block`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ users: ids }),
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
export async function unLockUsers(
  token: string,
  ids: any[]
): Promise<ApiSuccessResponseWithData<User[]>> {
  try {
    const req = await fetch(`${BASE_URL}/users/unlock`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ users: ids }),
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
export async function deleteUsers(
  token: string,
  ids: any[]
): Promise<ApiSuccessResponseWithData<User[]>> {
  try {
    const req = await fetch(`${BASE_URL}/users`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ users: ids }),
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
