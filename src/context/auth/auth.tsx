"use client";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
export type AuthContextType = {
  logUser: (name: string, access_token: string) => void;
  logOutUser: () => void;
  getUserName: () => string | null;
  isUserLoggedIn: boolean;
};
export const AuthUser = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("userName");
    const access_token = localStorage.getItem("access_token");
    if (name && access_token) setIsUserLoggedIn(true);
  }, []);

  const logUser = (name: string, access_token: string) => {
    localStorage.setItem("userName", name);
    localStorage.setItem("access_token", access_token);
    setIsUserLoggedIn(true);
    router.replace("/");
  };
  const logOutUser = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("access_token");
    setIsUserLoggedIn(false);
    router.replace("/auth/login");
  };

  const getUserName = (): string | null => {
    const name = localStorage.getItem("userName");
    if (name) return name;
    return null;
  };

  return (
    <AuthUser.Provider
      value={{ logOutUser, logUser, isUserLoggedIn, getUserName }}
    >
      {children}
    </AuthUser.Provider>
  );
}
