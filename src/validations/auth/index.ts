import { z } from "zod";
export const RegisterUserSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  name: z
    .string()
    .min(4, { message: "Name must contain at least 4 character(s)" }),
  position: z
    .string()
    .min(2, { message: "Position must contain at least 4 character(s)" }),
  password: z
    .string()
    .min(1, { message: "Password must contain at least 1 character(s) " }),
  date: z.date(),
});

export const LoginUserSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(1, { message: "Password must contain at least 1 character(s) " }),
  date: z.date(),
});

export type RegisterUserType = z.infer<typeof RegisterUserSchema>;
export type UserLoginType = z.infer<typeof LoginUserSchema>;
