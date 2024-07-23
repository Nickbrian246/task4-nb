"use client";
import { createContext, useState } from "react";
export type AuthContextType = {
  logUser: (name: string, access_token: string) => void;
  logOutUser: () => void;
  isUserLoggedIn: boolean;
};
export const AuthUser = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const logUser = (name: string, access_token: string) => {
    localStorage.setItem("userName", name);
    localStorage.setItem("access_token", access_token);
    setIsUserLoggedIn(true);
  };
  const logOutUser = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("access_token");
    setIsUserLoggedIn(false);
  };

  return (
    <AuthUser.Provider value={{ logOutUser, logUser, isUserLoggedIn }}>
      {children}
    </AuthUser.Provider>
  );
}
