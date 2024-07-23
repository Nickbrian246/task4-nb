import { RegisterUserType } from "@/validations/auth";
import {
  ApiAuthUserSuccess,
  ApiAuthUserSuccessMetaData,
  ApiFailureResponse,
  ApiSuccessResponseWithMetadata,
} from "@/types/api";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function registerUser(
  userData: RegisterUserType
): Promise<
  ApiSuccessResponseWithMetadata<ApiAuthUserSuccess, ApiAuthUserSuccessMetaData>
> {
  try {
    const req = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
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
