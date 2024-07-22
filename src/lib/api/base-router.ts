import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";

const createBaseRouter = createEdgeRouter<NextRequest, NextResponse>();

export default createBaseRouter;
// .use(
//   async (request, event, next) => {
//     // logging request example
//     console.log(`${request.method} ${request.url}`);
//     return NextResponse.redirect("/");
//     return next();
//   }
// )
