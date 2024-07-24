import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";
import authMiddleware from "@/middlewares/auth-middleware";
import errorHandlerMiddleware from "@/middlewares/error-handler-middleware";
const createBaseRouter = createEdgeRouter<NextRequest, NextResponse>()
  .use(errorHandlerMiddleware)
  .use(authMiddleware);

export default createBaseRouter;
