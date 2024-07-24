import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";
import errorHandlerMiddleware from "@/middlewares/error-handler-middleware";

const createBaseRouter = createEdgeRouter<NextRequest, NextResponse>().use(
  errorHandlerMiddleware
);

export default createBaseRouter;
