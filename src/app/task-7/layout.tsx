import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Task 7 chat app",
  description: "Chat app ",
};

export default function TaskLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <section>{children}</section>;
}
