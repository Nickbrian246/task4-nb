import { formatDate } from "@/utils/date";
import { groupOfUsersSchema } from "@/validations/users";
import { NextResponse } from "next/server";
import prisma from "../../../prisma";

export const users = async (req: Request): Promise<NextResponse> => {
  const id = req.headers.get("user") as string;

  const { status } = await prisma.user.findFirstOrThrow({
    where: { id },
  });

  if (status === "BLOCKED")
    return NextResponse.json({ message: "UserBlocked" }, { status: 400 });

  const data = await prisma.user.findMany();

  return NextResponse.json({
    data,
  });
};

export const deleteUsers = async (req: Request): Promise<NextResponse> => {
  const id = req.headers.get("user") as string;
  const { status } = await prisma.user.findFirstOrThrow({
    where: { id },
  });

  if (status === "BLOCKED")
    return NextResponse.json({ message: "UserBlocked" }, { status: 400 });

  const body = await req.json();
  const { users } = groupOfUsersSchema.parse(body);

  await prisma.user.deleteMany({
    where: { id: { in: users } },
  });
  const data = await prisma.user.findMany();

  return NextResponse.json(
    {
      data,
    },
    { status: 200 }
  );
};

export const blockUsers = async (req: Request): Promise<NextResponse> => {
  const id = req.headers.get("user") as string;

  const { status } = await prisma.user.findFirstOrThrow({
    where: { id },
  });

  if (status === "BLOCKED")
    return NextResponse.json({ message: "UserBlocked" }, { status: 400 });

  const body = await req.json();
  const { users } = groupOfUsersSchema.parse(body);

  await prisma.user.updateMany({
    where: { id: { in: users } },
    data: { status: "BLOCKED" },
  });

  const data = await prisma.user.findMany();

  return NextResponse.json(
    {
      data,
    },
    { status: 200 }
  );
};

export const unlockUsers = async (req: Request): Promise<NextResponse> => {
  const id = req.headers.get("user") as string;
  const { status } = await prisma.user.findFirstOrThrow({
    where: { id },
  });
  if (status === "BLOCKED")
    return NextResponse.json({ message: "UserBlocked" }, { status: 400 });

  const body = await req.json();
  const { users } = groupOfUsersSchema.parse(body);

  await prisma.user.updateMany({
    where: { id: { in: users } },
    data: { status: "ACTIVE" },
  });

  const data = await prisma.user.findMany();

  return NextResponse.json(
    {
      data,
    },
    { status: 200 }
  );
};
