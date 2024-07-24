import { formatDate } from "@/utils/date";
import { groupOfUsersSchema } from "@/validations/users";
import { NextResponse } from "next/server";
import prisma from "../../../prisma";

export const users = async () => {
  const users = await prisma.user.findMany();
  const data = users.map((user) => {
    return {
      ...user,
      lastLogin: formatDate(user.lastLogin),
    };
  });

  return NextResponse.json({
    data,
  });
};

export const deleteUsers = async (req: Request) => {
  const body = await req.json();
  const { users } = groupOfUsersSchema.parse(body);

  await prisma.user.deleteMany({
    where: { id: { in: users } },
  });
  const groupOfUsers = await prisma.user.findMany();
  const data = groupOfUsers.map((user) => {
    return {
      ...user,
      lastLogin: formatDate(user.lastLogin),
    };
  });
  return NextResponse.json(
    {
      data,
    },
    { status: 200 }
  );
};

export const blockUsers = async (req: Request) => {
  const body = await req.json();
  const { users } = groupOfUsersSchema.parse(body);

  await prisma.user.updateMany({
    where: { id: { in: users } },
    data: { status: "BLOCKED" },
  });

  const groupOfUsers = await prisma.user.findMany();

  const data = groupOfUsers.map((user) => {
    return {
      ...user,
      lastLogin: formatDate(user.lastLogin),
    };
  });

  return NextResponse.json(
    {
      data,
    },
    { status: 200 }
  );
};

export const unlockUsers = async (req: Request) => {
  const body = await req.json();
  const { users } = groupOfUsersSchema.parse(body);

  await prisma.user.updateMany({
    where: { id: { in: users } },
    data: { status: "ACTIVE" },
  });

  const groupOfUsers = await prisma.user.findMany();

  const data = groupOfUsers.map((user) => {
    return {
      ...user,
      lastLogin: formatDate(user.lastLogin),
    };
  });

  return NextResponse.json(
    {
      data,
    },
    { status: 200 }
  );
};
