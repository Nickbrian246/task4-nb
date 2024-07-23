import { AuthUser, AuthContextType } from "@/context/auth/auth";
import { useContext } from "react";
export function useAuthUserContext(): AuthContextType {
  const user = useContext(AuthUser);
  if (!user) {
    throw new Error(
      "useAuthUserContext must be used inside an AuthUser.Provider."
    );
  }
  return user;
}
