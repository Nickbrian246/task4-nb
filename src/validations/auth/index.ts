import { z } from "zod";
import { Status } from "@prisma/client";
export const RegisterUserSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  name: z.string().min(4),
  position: z.string().min(4),
  password: z.string().min(1),
});

export const LoginUserSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(1),
});
