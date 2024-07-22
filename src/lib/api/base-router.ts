import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";

const createBaseRouter = createEdgeRouter<NextRequest, NextResponse>();

export default createBaseRouter;
