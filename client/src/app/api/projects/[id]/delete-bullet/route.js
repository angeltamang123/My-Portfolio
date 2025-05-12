import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import * as projectService from "@/services/projectService";
import { protectRouteLogic } from "@/lib/adminAuthMiddleware";

export async function PATCH(request, context) {
  console.log(
    "PATCH HANDLER: Received context:",
    JSON.stringify(context, null, 2)
  ); // Log the whole context object
  console.log(
    "PATCH HANDLER: context.params:",
    JSON.stringify(context?.params, null, 2)
  ); // Log params specifically
  const authResult = await protectRouteLogic(request);
  if (!authResult.success) {
    return NextResponse.json(
      { message: authResult.message },
      { status: authResult.statusCode || 401 }
    );
  }
  try {
    if (
      !context ||
      !context.params ||
      typeof context.params.id === "undefined"
    ) {
      console.error(
        "PATCH HANDLER: ID not found in context.params. Context:",
        JSON.stringify(context, null, 2)
      );
      return NextResponse.json(
        { message: "Project ID is missing in the route parameters." },
        { status: 400 }
      );
    }
    await connectDB();
    const { id } = context.params;
    const body = await request.json();

    if (!body || typeof body.bullet !== "string") {
      return NextResponse.json(
        { message: "Bullet content to delete (string) is required" },
        { status: 400 }
      );
    }
    const result = await projectService.deleteProjectBulletService(id, body);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error.statusCode === 404) {
      return new NextResponse(error.message, { status: 404 });
    }
    return NextResponse.json(
      { error: error.message || "Error deleting bullet point" },
      { status: error.statusCode || 500 }
    );
  }
}
