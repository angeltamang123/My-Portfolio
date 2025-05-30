import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import * as projectService from "@/services/projectService";
import { protectRouteLogic } from "@/lib/adminAuthMiddleware";

export async function PATCH(request, context) {
  const authResult = await protectRouteLogic(request);
  if (!authResult.success) {
    return NextResponse.json(
      { message: authResult.message },
      { status: authResult.statusCode || 401 }
    );
  }
  try {
    await connectDB();
    const { id } = context.params;
    const body = await request.json();

    if (!body || typeof body.bullet !== "string") {
      return NextResponse.json(
        { message: "Bullet content (string) is required" },
        { status: 400 }
      );
    }

    const result = await projectService.addProjectBulletService(id, body);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error.statusCode === 404 || error.statusCode === 409) {
      return new NextResponse(error.message, { status: error.statusCode });
    }
    return NextResponse.json(
      { error: error.message || "Error adding bullet point" },
      { status: error.statusCode || 500 }
    );
  }
}
