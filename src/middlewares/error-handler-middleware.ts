import { NextHandler } from "next-connect";
import { NextResponse } from "next/server";

const errorHandlerMiddleware = async (req: Request, next: NextHandler) => {
  try {
    await next();
  } catch (error) {
    console.error("Error:", error);

    // if (error instanceof ForbiddenError) {
    //   res.status(403).json({
    //     message: error.message,
    //   });
    //   return;
    // }

    // if (error instanceof ZodError) {
    //   res.status(400).json({
    //     errors: error.errors,
    //     message: error.message,
    //   });
    //   return;
    // }

    // if (error instanceof Prisma.PrismaClientKnownRequestError) {
    //   if (error.code === "P2025") {
    //     res.status(404).json({
    //       message: error.message,
    //     });
    //     return;
    //   }

    //   if (error.code === "P2002") {
    //     const modelName = error.meta?.modelName;
    //     let attributeName = error.meta?.target as string;
    //     attributeName = attributeName.replace(`${modelName}_`, "");
    //     attributeName = attributeName.replace("_key", "");
    //     const message = `There already is a ${modelName} with the same ${attributeName}`;
    //     res.status(400).json({
    //       message,
    //     });
    //     return;
    //   }

    //   res.status(400).json({
    //     message: error.message,
    //   });
    //   return;
    // }

    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};

export default errorHandlerMiddleware;
