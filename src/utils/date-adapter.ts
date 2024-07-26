import { User } from "@prisma/client";
import { formatDate } from "./date";
export interface localUser extends Omit<User, "lastLogin"> {
  lastLogin: string;
}
export function usersDateAdapter(users: User[]): localUser[] {
  return users.map((user) => {
    return {
      ...user,
      lastLogin: formatDate(user.lastLogin),
    };
  });
}
