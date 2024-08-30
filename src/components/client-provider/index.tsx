"use client";
import { Header } from "../header";
import { AuthProvider } from "@/context/auth/auth";
import { GlobalWarningProvider } from "@/context/global-warning/global-warning";

export default function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <GlobalWarningProvider>
        <section>
          {/* <Header /> */}
          {children}
        </section>
      </GlobalWarningProvider>
    </AuthProvider>
  );
}
