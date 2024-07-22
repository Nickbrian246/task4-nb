import { z } from "zod";
export const RegisterUserSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  name: z.string().min(4),
  position: z.string().min(2),
  password: z.string().min(1),
});

export const LoginUserSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(1),
});

export type RegisterUserType = z.infer<typeof RegisterUserSchema>;
