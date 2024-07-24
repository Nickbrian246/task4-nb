import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { groupOfUsersSchema } from "@/validations/users";
import prisma from "../../../prisma";
import { formatDate } from "@/utils/date";

export const users = async () => {
  try {
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
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002")
        return NextResponse.json({ message: `This email already exist ` });
      return NextResponse.json({ message: `${error.message}` });
    }
    if (error instanceof ZodError) {
      return NextResponse.json({ message: `${error.message}` });
    }
    return NextResponse.json({
      message: `something went wrong please contact support`,
    });
  }
};

export const deleteUsers = async (req: Request) => {
  try {
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
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002")
        return NextResponse.json({ message: `This email already exist ` });
      return NextResponse.json({ message: `${error.message}` });
    }
    if (error instanceof ZodError) {
      return NextResponse.json({ message: `${error.message}` });
    }
    return NextResponse.json({
      message: `something went wrong please contact support`,
    });
  }
};

export const blockUsers = async (req: Request) => {
  try {
    const body = await req.json();
    const { users } = groupOfUsersSchema.parse(body);
    console.log(users);

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
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002")
        return NextResponse.json({ message: `This email already exist ` });
      return NextResponse.json({ message: `${error.message}` });
    }
    if (error instanceof ZodError) {
      return NextResponse.json({ message: `${error.message}` });
    }
    return NextResponse.json({
      message: `something went wrong please contact support`,
    });
  }
};

export const unlockUsers = async (req: Request) => {
  try {
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
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002")
        return NextResponse.json({ message: `This email already exist ` });
      return NextResponse.json({ message: `${error.message}` });
    }
    if (error instanceof ZodError) {
      return NextResponse.json({ message: `${error.message}` });
    }
    return NextResponse.json({
      message: `something went wrong please contact support`,
    });
  }
};
