"use client";
import { Header } from "../header";
import { AuthProvider } from "@/context/auth/auth";

export default function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <section>
        <Header />
        {children}
      </section>
    </AuthProvider>
  );
}
