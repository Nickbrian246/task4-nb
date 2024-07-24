import { string, z } from "zod";

export const groupOfUsersSchema = z.object({
  users: z.array(z.string()).min(1),
});
